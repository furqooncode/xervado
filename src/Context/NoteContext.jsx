import React, { useState, useContext, createContext } from 'react';
import db from '../lib/util.jsx';
const NoteContext = createContext();

export function NoteProvider({children}){
  const [head, setHead] = useState('')
  const [note, setNote] = useState('')
const [noteId, setNoteId] = useState(null)
  async function handleNoteSaves(){
    if(noteId){
      try{
        const update = await db.updateDocument("Notes", noteId, {
        Head:head,
        Note:note
      })
      alert('saved')
      }catch (error){
        alert(error.message)
      }
    }else{
      try{
      const newNote = await db.createDocument("Notes", {
        Head: head,
        Note: note,
        Time: new Date().toLocaleString(),
      });
      setNoteId(newNote.id)
    }catch(error){
      alert(error.message)
    } 
      }
  }
  return(
    <NoteContext.Provider value={{head, setHead, note, setNote , setNoteId,
    handleNoteSaves}}>
      {children}
    </NoteContext.Provider>
    )
}

export function useNote(){
  return(
    useContext(NoteContext)
    )
}