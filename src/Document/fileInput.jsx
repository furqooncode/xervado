import React, { useState } from 'react';
import darkColors from '../darkColors.js';
import { formatDate } from '../Formatdate.jsx';
import { useDocument } from '../Context/DocumentContext.jsx';

export default function DocumentInput({onHide}) {
  const { handleSelect, fileSize, previewUrl, uploadFile,
    uploadProgress, sending, name, description, setName, setDescription, selectedFile } = useDocument();
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div
        className="w-[88%] h-[78%] rounded-xl p-4 overflow-auto relative"
        style={{ backgroundColor: darkColors.list }}
      >
        <div className="absolute top-0 w-[97%] flex justify-between items-center left-0 p-3">
          <button
            onClick={onHide}
            className="text-2xl z-50 ml-[5px]"
            style={{ color: darkColors.text }}
          >
            <i className="fas fa-times"></i>
          </button>
        
          <div className="w-[50px] h-[50px] rounded-[50%] flex justify-center items-center z-50 bg-transparent text-2xl mr-[-2px]"
            style={{
              color: darkColors.text,
            }} 
            onClick={() => {
              if(sending === true){
                alert("cannot abort ongoing upload");
              }
            }}
          >
            <label htmlFor="fileInput" className="text-2xl cursor-pointer" style={{
              color: darkColors.text,
            }}>
              <i className="fas fa-upload"></i>
            </label>
          </div>
        </div>

        <div className="flex justify-center mb-4 mt-16">
          {previewUrl ? (
            <div className="text-center">
              <i className="fas fa-file-alt text-6xl text-purple-500 mb-2"></i>
              <p className="text-sm" style={{ color: darkColors.text }}>
                {selectedFile?.name || 'Document selected'}
              </p>
            </div>
          ) : (
            <div className="text-center" style={{ color: darkColors.textSecondary }}>
              <i className="fas fa-cloud-upload-alt text-6xl mb-2"></i>
              <p>Select a document to upload</p>
            </div>
          )}
        </div>

        <div className="mb-3 grid gap-[10px]">
          <input
            type="file"
            accept="application/pdf,
              application/msword,
              application/vnd.openxmlformats-officedocument.wordprocessingml.document,
              application/vnd.ms-excel,
              application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,
              text/plain,
              application/zip,
              application/x-rar-compressed,
              application/json,
              application/xml,
              application/octet-stream,
              application/x-7z-compressed,
              application/x-tar"
            onChange={handleSelect}
            id="fileInput"
            className="hidden"
            disabled={sending === true}
          />
          
          <label style={{ color: darkColors.textPrimary }}>Name</label>
          <input
            type="text"
            className="w-full mt-1 p-2 rounded-md outline-none"
            placeholder="document name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            style={{
              backgroundColor: 'transparent',
              border: `1px solid ${darkColors.border}`,
              color: darkColors.text,
            }}
            disabled={sending}
          />

          <label style={{ color: darkColors.textPrimary }}>Description</label>
          <textarea
            className="w-full mt-1 p-2 rounded-md outline-none resize-none"
            rows="3"
            placeholder="document description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            style={{
              backgroundColor: 'transparent',
              border: `1px solid ${darkColors.border}`,
              color: darkColors.text,
            }}
            disabled={sending}
          />
        </div>

        <div
          className="flex justify-between text-sm mb-4"
          style={{ color: darkColors.textSecondary }}
        >
          <div>
            File size: {fileSize || 'N/A'}<br />
            Type: Document
          </div>
          <div className="text-right">
            CreatedAt: {formatDate(new Date()).toUpperCase()}
            Name: {name || 'unnamed'}<br />
          </div>
        </div>

        <button
          className="w-full py-3 rounded-md font-semibold text-lg bg-purple-800 disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ color: darkColors.text }}
          disabled={sending || !previewUrl}
          onClick={async () => {
            await uploadFile();
            if(uploadProgress === 100) {
              onHide();
            }
          }}
        >
          UPLOAD
          {uploadProgress > 0 && `(${uploadProgress}%)`}
        </button>
      </div>
    </div>
  );
}