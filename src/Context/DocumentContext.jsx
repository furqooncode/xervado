import { useState, useEffect } from "react";
import { createContext, useContext } from "react";
import db from '../lib/util.jsx';
import { formatDate } from '../Formatdate.jsx';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const DocumentContext = createContext();

export function DocumentProvider({children}) {
  const queryClient = useQueryClient();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileSize, setFileSize] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileId, setFileId] = useState(null);
  const [sending, setSending] = useState(false);
  const [mediaId, setMediaId] = useState(null);
  const [mediaUrl, setMediaUrl] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  
  //Avoid memory leak
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);
  
  function ClearNotes(){
    setName('');
    setDescription('');
  }
  
  // format upload size
  function formatFileSize(bytes) {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      parseFloat((bytes / Math.pow(k, i)).toFixed(2)) +
      " " +
      sizes[i]
    );
  }

  //input function that selectfile
  function handleSelect(e) {
    ClearNotes();
    const file = e.target.files[0];
    if (!file) return;

    const allowedDocs = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/plain",
      "application/zip",
      "application/x-rar-compressed",
      "application/json",
      "application/xml",
      "application/octet-stream",
      "application/x-7z-compressed",
      "application/x-tar"
    ];

    if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
      alert("Only documents are allowed");
      return;
    }

    if (!allowedDocs.includes(file.type)) {
      alert("Only allowed document types are accepted");
      return;
    }

    const maxSize = 100 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("File too large (max 100MB)");
      return;
    }
     
    setSelectedFile(file);
    setFileSize(formatFileSize(file.size));
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
  }

  // use XMLHttpRequest to check for uploads 
  function uploadMedia(file) {
    return new Promise((resolve, reject) => {
      console.log('Uploading file:', file);
      const xhr = new XMLHttpRequest();
      const formData = new FormData();
      const resourceType = "raw"; // For documents

      formData.append("file", file);
      formData.append("upload_preset", "hamzat");

      xhr.open(
        "POST",
        `https://api.cloudinary.com/v1_1/dlijiq0w3/${resourceType}/upload`
      );

      // progress tracking
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded / e.total) * 100);
          setUploadProgress(percent);
        }
      };

      xhr.onload = () => {
        console.log('XHR Status:', xhr.status);
        console.log('XHR Response:', xhr.responseText);
        
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          resolve({
            url: response.secure_url,
            publicId: response.public_id,
          });
        } else {
          reject(`Upload failed: ${xhr.responseText}`);
        }
      };

      xhr.onerror = () => {
        console.error('XHR Error');
        reject(error.message);
      };

      xhr.send(formData);
    });
  }

  // this function will be on our button
  async function uploadFile() {
    console.log('uploadFile called, selectedFile:', selectedFile);
    
    if (!selectedFile) {
      alert("No file selected");
      return;
    }
  
    setUploadProgress(0);
    try {
      setSending(true);
      
      if(name.length === 0){
        alert('please input a name');
        setSending(false);
        return;
      } else if(name.includes(" ")){
        alert('name should not contain a space');
        setSending(false);
        return;
      } else if(name.length > 9){
        alert('name is too long');
        setSending(false);
        return;
      }
      
      if(description.length === 0){
        const check = confirm(
          "Are you sure you didn't want to put a description to your uploaded file??");
        if(!check) {
          setSending(false);
          return;
        }
      }
      
      console.log('Starting upload...');
      const { url, publicId } = await uploadMedia(selectedFile);
      console.log('Upload complete:', url, publicId);

      setMediaUrl(url);
      setMediaId(publicId);
      
      // save to database
      const User_Id = db.auth.getUser().id;
      const saveLive = await db.createDocument("Document", {
        Name: name,
        Description: description,
        DocUrl: url,
        DocId: publicId,
        Time: formatDate(new Date()).toUpperCase(),
        UserID: User_Id,
      });
      
      setFileId(saveLive.id);
      await queryClient.invalidateQueries({ queryKey: ['Document', User_Id] });
      
      alert("Upload successful");
      setUploadProgress(0);
      setPreviewUrl(null);
      setSelectedFile(null);
      ClearNotes();
    } catch (err) {
      console.error('Upload error:', err);
      alert(err.message || err);
      setUploadProgress(0);
    } finally {
      setSending(false);
      setUploadProgress(0);
      setPreviewUrl(null);
    }
  }
  
  //full preview when the file is clicked
  function ListToView(docData) {
    setFileId(docData.fileId);
    setMediaUrl(docData.DocUrl);
    setName(docData.Name);
    setMediaId(docData.DocId);
  }

  async function handleDelete(navigate){
    try{
      if(!fileId){
        alert("No file ID found!");
        return;
      }
      
      const User_Id = db.auth.getUser().id;
      
      // Delete from database
      await db.deleteDocument("Document", fileId);
      await queryClient.invalidateQueries({ queryKey: ['Document', User_Id] });
      
      alert("Deleted successfully!");
      navigate('/Addfile');
      
    } catch(error){
      console.error('Delete error:', error);
      alert(error.message);
    }
  }

  return (
    <DocumentContext.Provider value={{
      handleSelect,
      fileSize,
      previewUrl,
      uploadFile, 
      uploadProgress,
      sending,
      name,
      description,
      setName,
      setDescription,
      ListToView,
      mediaUrl,
      mediaId,
      fileId,
      handleDelete,
      selectedFile
    }}>
      {children}
    </DocumentContext.Provider>
  );
}

export function useDocument(){
  return useContext(DocumentContext);
}