import React, { useState } from 'react';
import darkColors from '../darkColors.js';
import { formatDate } from '../Formatdate.jsx';
import VideoPlayer from './videoplayer';
import { useGallery } from '../Context/GalleryContext.jsx';

export default function Galleryinput({onHide}) {
  const { handleSelect, fileSize, previewUrl, fileType, uploadFile,
  uploadProgress, sending, name, description, setName, setDescription } = useGallery();
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div
        className="w-[88%] h-[78%] rounded-xl p-4 overflow-auto relative"
        style={{ backgroundColor: darkColors.list }}
      >
        <div className="absolute top-0 w-[97%] flex justify-between items-center
        left-0 p-3">
        <button
          onClick={onHide}
          className=" text-2xl z-50 ml-[5px]"
          style={{ color: darkColors.text }}
        >
          <i class="fas fa-multiply"></i>
        </button>
        
         <div className=" w-[50px] h-[50px] rounded-[50%] bg-red-500 flex
         justify-center items-center z-50 bg-transparent text-2xl 
         mr-[-2px]"
  style={{
    color: darkColors.text,
  }} 
  onClick={()=>{
    if(sending === true){
      alert("cannot abort ongoing upload")
    }
  }}>
    <label htmlFor="fileInput" className="text-2xl" style={{
       color: darkColors.text,
    }}>
      <i class="fas fa-upload"></i>
    </label>
  </div>
  
  </div>

        <div className="flex justify-center mb-4 mt-10 ">

        
          {previewUrl && fileType === 'image' ? (
            <div
              className="w-[150px] h-[150px] rounded-xl flex items-center justify-center"
              style={{ backgroundColor: darkColors.list }}
            >
         <img className="h-full w-full object-cover" src={previewUrl} alt={name} />
            </div>
          ) : (
            <div
              className="w-full h-[180px] rounded-lg flex items-center
              justify-center "
              style={{
         backgroundColor: darkColors.list
              }}
            >
      <VideoPlayer src={previewUrl} />
            </div>
          )}
        </div>
      

        <div className="mb-3 grid gap-[10px]">
           
           <input
            type="file"
            accept="image/*,video/*"
            onChange={handleSelect}
            id="fileInput"
            className="w-full mt-1 p-2 rounded-md file:mr-4 file:px-3 file:py-1
            file:rounded-md file:border-0 hidden"
            style={{
              backgroundColor: darkColors.list,
              border: `1px solid ${darkColors.border}`,
              color: darkColors.text,
            }}
            disabled={sending === true}
          />
          
          <label style={{ color: darkColors.textPrimary }}>Name</label>
          <input
            type="text"
            className="w-full mt-1 p-2 rounded-md outline-none"
            placeholder="img/vid name"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
            }}
            style={{
              backgroundColor: 'transparent',
              border: `1px solid ${darkColors.border}`,
              color: darkColors.text,
            }}
          />

          <label style={{ color: darkColors.textPrimary }}>Description</label>
          <input
            type="text"
            className="w-full mt-1 p-2 rounded-md outline-none"
            value={description}
            onChange={(e)=>{
          setDescription(e.target.value)
            }}
            style={{
              backgroundColor: 'transparent',
              border: `1px solid ${darkColors.border}`,
              color: darkColors.text,
            }}
          />

         
         
        </div>

        <div
          className="flex justify-between text-sm mb-4"
          style={{ color: darkColors.textSecondary }}
        >
          <div>
            File size: {fileSize}<br />
            Type: {fileType}
          </div>
          <div className="text-right">
            Name: {fileType === 'video' ? `${name}.mp4` : `${name}.png`}<br />
            CreatedAt: {formatDate(new Date()).toUpperCase()}
          </div>
        </div>

        <button
          className="w-full py-3 rounded-md font-semibold text-lg bg-purple-800"
          style={{ color: darkColors.text }}
          disabled={sending}
           onClick={uploadFile}>
          UPLOAD
{uploadProgress > 0 && `(${uploadProgress}%)`}
      </button>
      </div>
    </div>
  );
}