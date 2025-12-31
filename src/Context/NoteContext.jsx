import React, { useState, useContext, createContext } from 'react';
import db from '../lib/util.jsx';
const NoteContext = createContext();
import { formatDate } from '../Formatdate.jsx';
import { useQueryClient } from '@tanstack/react-query';


export function NoteProvider({children}){
  const queryClient = useQueryClient();
  const [head, setHead] = useState('')
  const [note, setNote] = useState('')
const [noteId, setNoteId] = useState(null);
  const [fav, setFav] = useState(false);

  

 
 //Creating new notes and updating
  async function handleNoteSaves(){
    if(noteId){
      try{
        const update = await db.updateDocument("Notes", noteId, {
        Head:head,
        Note:note
      })
      alert('updated')
      }catch (error){
        alert(error.message)
      }
    }else{
      try{
      const newNote = await db.createDocument("Notes", {
        Head: head,
        Note: note,
        favList: fav,
        Time: formatDate(new Date()).toUpperCase(),
        UserID: db.auth.getUser().id,
      });
      setNoteId(newNote.id);
      alert('saved')
    }catch(error){
      alert(error.message)
    }
      }
  }
  
  //ClearNotes when backing||returning
  function ClearNotes(){
   setNoteId(null)
   setNote('');
   setHead('')
 }
 
 //Editing notes onClick
 function ListToEdit(noteData){
   setNoteId(noteData.id)
   setHead(noteData.Head)
   setNote(noteData.Note)
 }
 
 //adding to favourites
 async function handleFav(addToFav){
   try{
     await db.createDocument("Favourites")
   }catch(error){
     alert(error.message)
   }
 }
 
 //deleting lists from both fav and ui
  async function handleDelete(noteId){
    try{
      alert("deleting..")
  await db.deleteDocument("Notes", noteId);
    alert("deleted")
    //refresh page
    queryClient.invalidateQueries(['Diary']);
    }catch(error){
      alert(error.message)
    }
  }

//add to favourites
async function handleFavorite(noteId) {
  try{
   const newFav = !fav
   setFav(newFav)
  await db.updateDocument("Notes", noteId,{
        favList: newFav,
      });
  }catch(error){
    alert(error.message)
    setFav(prevFav => !prevFav);
  }
}


function handleCopy() {
  if (!head || !note) {
    alert("no text to copy");
    return;
  }
  const text = `${head}\n\n${note}`;  // Fixed: Use ${} and added line breaks
  navigator.clipboard.writeText(text)
    .then(() => alert('Copied!'))
    .catch(err => alert('Copy failed: ' + err));
}

  return(
    <NoteContext.Provider value={{
    head, 
    setHead, 
    note, 
    setNote , 
    setNoteId,
    handleNoteSaves,
    ClearNotes,
    ListToEdit,
    handleDelete,
    handleFavorite, 
    fav,
    handleCopy,
    }}>
      {children}
    </NoteContext.Provider>
    )
}

export function useNote(){
  return(
    useContext(NoteContext)
    )
}