import React, { useState } from 'react';
import darkColors from '../darkColors.js';
import { useLink } from '../Context/LinkContext.jsx';

export default function Linkinput({onHide}){
  const { handleSave, title, setTitle, url, setUrl, type, setType, description, setDescription, loading } = useLink()
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50 backdrop-blur-sm">
      
     <div className="w-[90%] h-[82%] rounded-xl p-4 overflow-auto relative mt-[30px]"
        style={{ 
        backgroundColor: darkColors.list 
        }}>
        
        {/*head*/}
       <div className="absolute top-0 w-[97%] flex justify-between items-center left-0 p-3">
    <div className="text-2xl mr-[-2px]"
            style={{
              color: darkColors.text,
            }}>
            <span>ADD LINKS</span>
          </div>
          
         <button
          className="text-2xl z-50 ml-[5px]"
            style={{
            color: darkColors.text
            }}
            onClick={onHide}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        {/*inputs*/}
      <div className="mt-[35px]">
     <label className="text-white text-sm font-semibold">Link Title</label><br />
        <input 
        type="text"
        value={title}
        placeholder="Link Title"
        onChange={(e)=>{
          setTitle(e.target.value)
        }}
        className="p-[10px] w-full rounded-md border active:purple-800
        border-white bg-black/10 font-semibold text-white"
        /><br />
    <div className="flex justify-between w-full bg-transparent mb-[10px]">
          <p className="text-xs text-gray-300 lowercase">max 45 words</p>
       <span className="text-xs text-gray-300 lowercase ">{title.length}</span>
        </div>
        
        <label className="text-white text-sm font-semibold">Link Type</label><br />
        <input 
        type="text"
        value={type}
        placeholder="e.g music link"
        onChange={(e)=>{
          setType(e.target.value)
        }}
        className="p-[10px] w-full rounded-md border active:purple-800
        border-white bg-black/10 font-semibold text-white mb-[10px]"
        /><br />
        
        <label className="text-white text-sm font-semibold">Link URL</label><br />
        <input 
        type="text"
        placeholder="e.g https://www.google.com"
        value={url}
        onChange={(e)=>{
          setUrl(e.target.value)
        }}
        className="p-[10px] w-full rounded-md border active:purple-800
        border-white bg-black/10 font-semibold text-white mb-[10px]"
        /><br />
        
        <label className="text-white text-sm font-semibold">Link Title</label><br />
        <textarea
        rows="3"
        value={description}
        onChange={(e)=>{
          setDescription(e.target.value)
        }}
        placeholder="Link Description"
        className="p-[10px] w-full rounded-md border active:purple-800
        border-white bg-black/10 font-sans-serif font-semibold text-white
        "></textarea><br />
            <div className="flex justify-between w-full bg-transparent mb-[10px]">
          <p className="text-xs text-gray-300 lowercase">max 240 words</p>
  <span className="text-xs text-gray-300 lowercase">{description.length}</span>
        </div>


    <button className="w-full py-3 rounded-md font-semibold text-lg bg-purple-800"
        style={{
        color: darkColors.text
           }}
          onClick={handleSave}
           >
  {loading ? 'sending...' : 'send'}
        </button>
      </div>
      </div>
      </div>
  )
}