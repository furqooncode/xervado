import darkColors from '../darkColors.js';
import lightColors from '../lightColors.js';
import { useNavigate , Link } from 'react-router-dom';
import { useState } from 'react'
import { useNote } from '../Context/NoteContext.jsx';
import { useLayoutEffect, useRef } from "react";

export default function Text(){
  const { head, setHead, note, setNote } = useNote();
  const textareaRef = useRef(null);

  // useLayoutEffect runs synchronously after DOM updates but before paint
  useLayoutEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const newHeight = textareaRef.current.scrollHeight;
      const maxHeight = window.innerHeight * 0.8;
      textareaRef.current.style.height = `${Math.min(newHeight, maxHeight)}px`;
      textareaRef.current.style.overflowY = newHeight > maxHeight ? 'auto' : 'hidden';
    }
  }, [note]);

  return(
    <div className="max-w-md w-full mx-auto">
      <div className="p-[10px] pt-[60px] grid place-center items-center">
        <input 
          type="text"
          placeholder="Texts/Notes Header"
          className="fixed top-[60px] left-[3px] right-[3px] mx-auto max-w-md h-[65px] p-[10px] border border-purple-600 border-[3px] outline-none w-full text-2xl mb-[10px] rounded-[8px] font-bold z-10"
          style={{
            color: darkColors.textPrimary,
            backgroundColor: darkColors.background || '#1a1a1a'
          }}
          onChange={(e) => setHead(e.target.value)}
          value={head}
        />
        
        <textarea
          ref={textareaRef}
          rows={1}
          className="w-full p-[3px]"
          placeholder="Add your description"
          style={{
            resize: 'none',
            overflow: 'hidden',
            color: 'white',
            outline: 'none',
            background: 'transparent',
            fontSize: '14px',
            minHeight: '100px',
            maxHeight: '80vh',
          }}
          onInput={(e) => {
            e.target.style.height = 'auto';
            const newHeight = e.target.scrollHeight;
            const maxHeight = window.innerHeight * 0.8;
            e.target.style.height = `${Math.min(newHeight, maxHeight)}px`;
            e.target.style.overflowY = newHeight > maxHeight ? 'auto' : 'hidden';
          }}
          onChange={(e) => setNote(e.target.value)}
          value={note}
        />
      </div>
    </div>
  )
}