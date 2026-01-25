import { useState, useEffect } from "react";
import { createContext, useContext } from "react";
import db from '../lib/util.jsx';
import { formatDate } from '../Formatdate.jsx';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { showSuccess, showError } from '../Alert/darktoast.jsx'

const GalleryContext = createContext();

export function GalleryProvider({children}) {
  const queryClient = useQueryClient();
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [fileType, setFileType] = useState(null); // image | video
  const [fileSize, setFileSize] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
const [fileId, setFileId] = useState(null);
  const [sending,setSending] = useState(false);
  const [mediaId ,setMediaId] = useState(null);
  const [mediaUrl ,setMediaUrl] = useState(null)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('');
  const [galleryList, setGalleryList] = useState([]);
const [currentIndex, setCurrentIndex] = useState(0);

  
//Avoid memory leak
 useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);
  
  function ClearNotes(){
    setName('')
    setDescription('')
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

    // allow only image & video
    if (
      !file.type.startsWith("image/") &&
      !file.type.startsWith("video/")
    ) {
      showError("Only images and videos are allowed");
      return;
    }

    // size limit (example: 50MB)
    const maxSize = 50 * 1024 * 1024;
    if (file.size > maxSize) {
      showError("File too large (max 50MB)");
      return;
    }
   
   //set the selectfile and the file tyoe
    setSelectedFile(file);
setFileType(file.type.startsWith("video/") ? "video" : "image");
  
 {/* //set the filesize by calling the formatFileSize function and pass the
 file.size as its parameter */}

    setFileSize(formatFileSize(file.size));
    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
  }
  
  

// use XMLHttpRequest to check for uploads 

  function uploadMedia(file) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      const formData = new FormData();
    // this ks wat cloudinary checks
      const resourceType = file.type.startsWith("video/")
        ? "video"
        : "image";

      formData.append("file", file);
      formData.append("upload_preset", "hamzat");

      xhr.open(
        "POST",
        `https://api.cloudinary.com/v1_1/dlijiq0w3/${resourceType}/upload`
      );

  // progress tracking by XMLHttpRequest still on cloud functiom that its wants to check tracking
  
      xhr.upload.onprogress = (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded / e.total) * 100);
          setUploadProgress(percent);
        }
      };

      xhr.onload = () => {
        if (xhr.status === 200) {
    const response = JSON.parse(xhr.responseText);
      resolve({
      url:response.secure_url,
      publicId: response.public_id,
      });
        } else {
          reject("Upload failed");
        }
      };

      xhr.onerror = () => reject("Network error");

      xhr.send(formData);
    });
  }


// this function will be on our button
  async function uploadFile() {
    const polishedName = name.trim().replaceAll(" ", "_");
  
    if (!selectedFile) {
      showError("No file selected");
      return;
    }
  
    setUploadProgress(0);
    try {
      setSending(true)
    {/*  // run the uploadMedia function and set the selectedFile as parameter
    for it to run it */}
    if(name.length == ""){
      showError('please input a name')
  
      return;
    }
    
    if(description.length === 0){
 const check =  
 confirm(
   "Are you sure you didn't want to put a description to your uploaded file??");
    if(!check) {
      return;
    }
 }
const { url, publicId } = await uploadMedia(selectedFile);

  setMediaUrl(url);
  setMediaId(publicId);
      // save to database
      const User_Id = db.auth.getUser().id;
  const saveLive = await db.createDocument("Gallery", {
Name: polishedName,
Description: description,
GalleryUrl: url,
GalleryId : publicId,
Time: formatDate(new Date()).toUpperCase(),
GalleryType: fileType,
UserID: User_Id,
      });
      setFileId(saveLive.id);
  await queryClient.invalidateQueries({ queryKey: ['Gallery', User_Id] });
      showSuccess("Upload successful");
      setUploadProgress(0)
     setPreviewUrl(null)
      ClearNotes();
    } catch (err) {
      showError(err.message);
      console.error(err);
      setUploadProgress(0)
    }finally{
      setSending(false)
      setUploadProgress(0)
   setPreviewUrl(null)
    }
  }
  
//full preview when each media or video is clicked
 function MediaPreview({ list, index }) {
  if (!Array.isArray(list)) return;
  if (index < 0 || index >= list.length) return;
  // the arrays here are gotten fron the addGallery onClick

  const item = list[index];

  setGalleryList(list);
  setCurrentIndex(index);
  
// Generally needed of am not using the bytton for seitching oo 
// na switch button makes it look this way buddy

  setMediaId(item.GalleryId);
  setMediaUrl(item.GalleryUrl);
  setFileType(item.GalleryType);
  setName(item.Name);
  setFileId(item.fileId)
  
}

async function handleDelete(navigate){
  try{
    if(!fileId){
      showError("No file ID found!");
      return;
    }
    
    const User_Id = db.auth.getUser().id;
    // Delete from database  
await db.functions.execute("handle_delete",{
   payload:{
     id: mediaId,
      }
})
    showSuccess("Cloud fn worked")
    // Remove from current galleryList
    const updatedList = galleryList.filter((_, i) => i !== currentIndex);
    
    // If list is empty after delete, go back to gallery
    if(updatedList.length === 0){
      showSuccess("All items deleted!");
      await queryClient.invalidateQueries({ queryKey: ['Gallery', User_Id] });
      navigate('/Addgallery');
      return;
    }
    
    // Determine next index
    let nextIndex = currentIndex;
    if(currentIndex >= updatedList.length){
      nextIndex = updatedList.length - 1; // Go to previous if was last item
    }
    
    // Update gallery list and show next/previous item
    setGalleryList(updatedList);
    MediaPreview({
      list: updatedList,
      index: nextIndex
    });
    
    // Refresh in background
    queryClient.invalidateQueries({ queryKey: ['Gallery', User_Id] });
    
    showSuccess("Deleted successfully!");
    
  }catch(error){
    console.error('Delete error:', error);
    showError(error.message)
  }
}

  return (
  <GalleryContext.Provider value={{handleSelect,
  fileSize,
  previewUrl,
    fileType, 
    uploadFile, 
    uploadProgress,
    sending,
    name,
    description,
    setName,
    setDescription,
    MediaPreview,
    mediaUrl,
    mediaId,
    currentIndex, 
    galleryList,
    fileId,
    handleDelete
  }}>
      {children}
    </GalleryContext.Provider>
  );
}

export function useGallery(){
  return(
    useContext(GalleryContext)
    )
}
