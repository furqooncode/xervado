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
  const [DocType, setDocType] = useState(null);
  
  // Debug DocType changes
  useEffect(() => {
    console.log('DocType changed to:', DocType);
  }, [DocType]);
  
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

    // Check file size FIRST - immediate alert and return
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("files greater than 10mb");
      return;
    }

    const allowedDocs = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/plain"
    ];

    // Get file extension for Google Files compatibility
    const fileExtension = file.name.split('.').pop().toLowerCase();
    const allowedExtensions = ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'txt'];

    if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
      alert("Only documents are allowed");
      return;
    }

    // Check both MIME type and extension (Google Files fix)
    if (!allowedDocs.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
      alert("Only allowed document types are accepted");
      return;
    }
     
    // Set document type based on file type
    if (file.type.startsWith('application/pdf')) {
      setDocType('pdf');
    }
    else if (file.type.startsWith('application/vnd.openxmlformats-officedocument') || 
             file.type.startsWith('application/msword') ||
             file.type.startsWith('application/vnd.ms-excel') ||
             file.type.startsWith('application/vnd.ms-powerpoint')) {
      setDocType('office');
    }
    else {
      setDocType('other');
    }
    
    setSelectedFile(file);
    setFileSize(formatFileSize(file.size));
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
  }

  // use XMLHttpRequest to check for uploads - FIXED FOR GOOGLE FILES
  function uploadMedia(file) {
    return new Promise(async (resolve, reject) => {
      console.log('Uploading file:', file);
      
      try {
        // Convert to ArrayBuffer then Blob to fix Google Files issue
        const arrayBuffer = await file.arrayBuffer();
        
        // Determine correct MIME type based on extension if MIME is wrong
        let mimeType = file.type;
        if (!mimeType || mimeType === 'application/octet-stream') {
          const ext = file.name.split('.').pop().toLowerCase();
          const mimeMap = {
            'pdf': 'application/pdf',
            'doc': 'application/msword',
            'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'xls': 'application/vnd.ms-excel',
            'xlsx': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'txt': 'text/plain'
          };
          mimeType = mimeMap[ext] || 'application/octet-stream';
        }
        
        const blob = new Blob([arrayBuffer], { type: mimeType });
        
        const xhr = new XMLHttpRequest();
        const formData = new FormData();
        
        // CLOUDINARY CHANGE #1: Changed from "raw" to "auto" 
        // This allows Cloudinary to automatically detect and serve the file properly
        const resourceType = "auto"; // Previously was "raw"

        formData.append("file", blob, file.name);
        formData.append("upload_preset", "hamzat");
        
        // CLOUDINARY CHANGE #2: Add attachment flag
        // This makes the file viewable/downloadable directly from the URL
        formData.append("flags", "attachment");

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
            
            // CLOUDINARY CHANGE #3: Transform URL to ensure it's viewable
            // If the URL contains /raw/upload/, add fl_attachment flag
            let viewableUrl = response.secure_url;
            
            if (viewableUrl.includes('/raw/upload/')) {
              viewableUrl = viewableUrl.replace(
                '/raw/upload/',
                '/raw/upload/fl_attachment/'
              );
            }
            
            resolve({
              url: viewableUrl, // Return the transformed viewable URL
              publicId: response.public_id,
            });
          } else {
            reject(`Upload failed: ${xhr.responseText}`);
          }
        };

        xhr.onerror = () => {
          console.error('XHR Error');
          reject("An error occured");
        };

        xhr.send(formData);
        
      } catch (error) {
        console.error('File processing error:', error);
        reject("Failed to process file");
      }
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
      
      if(name.trim().length === 0){
        alert('please input a name');
        setSending(false);
        return;
      }
      
      // Sanitize the name - replace spaces with underscores
      const sanitizedName = name.trim().replaceAll(" ", "_");
      
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
      
      // save to database with sanitized name
      const User_Id = db.auth.getUser().id;
      const saveLive = await db.createDocument("Document", {
        Name: sanitizedName, // Use sanitized name
        Description: description,
        DocUrl: url,
        DocId: publicId,
        Time: formatDate(new Date()).toUpperCase(),
        UserID: User_Id,
      });
      console.log(url)
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
    // Set DocType when viewing existing document
    if (docData.DocUrl.includes('.pdf')) {
      setDocType('pdf');
    } else {
      setDocType('office');
    }
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
      selectedFile,
      DocType // Added DocType to context
    }}>
      {children}
    </DocumentContext.Provider>
  );
}

export function useDocument(){
  return useContext(DocumentContext);
}