import { useState, useEffect } from 'react';
import { useContext, createContext } from 'react';
import db from '../lib/util.jsx';
import { formatDate } from '../Formatdate.jsx';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { showSuccess, showError } from '../Alert/darktoast.jsx'

const LinkContext = createContext();
export function LinkProvider({children}){
  const queryClient = useQueryClient();
  const[title, setTitle] = useState('')
  const [type, setType] = useState('')
  const [url, setUrl] = useState('')
  const[description, setDescription] = useState('');
  const [linkId, setLinkId] = useState('')
const[loading, setLoading] = useState(false);
const [fav, setFav] = useState(false);

function Clear(){
  setTitle('')
  setDescription('')
  setType('')
  setLinkId('')
  setUrl('')
}

  async function handleSave(){
    if(linkId){
      setLoading(true)
      try{
    const update = await db.updateDocument("Links", linkId,{
        Title: title,
        Type: type,
        Url:url,
        Description: description,
      })
      setLoading(false)
    queryClient.invalidateQueries(['Link']);
      showSuccess('updated')
      
      }catch(error){
        setLoading(false)
        showError("An error occured!")
      }
    }else{
      try{
        setLoading(true)
    const newLink = await db.createDocument("Links", {
      Title: title,
       Type: type,
       Url:url,
       Description: description,
       Time: formatDate(new Date()).toUpperCase(),
        UserID: db.auth.getUser().id,
          favList: false,
    })
    setLinkId(newLink.id)
    queryClient.invalidateQueries(['Link']);
    setLoading(false)
    showSuccess('Link saved successfully')
      }catch(error){
        setLoading(false)
        showError(error.message)
      }
    }
  }
  
  //handle edit
  function Edit(newData){
    setTitle(newData.Title)
    setType(newData.Type)
    setDescription(newData.Description)
    setUrl(newData.Url)
    setLinkId(newData.id)
  }
  
  //handleDelete
  async function handleDelete(linkId){
    try{
      showSuccess("Deleting..")
     await db.deleteDocument("Links", linkId)
     showSuccess('deleted')
  queryClient.invalidateQueries(['Link']);
    }catch(error){
      showError("An error occured!")
      console.log(error.message)
    }
  }
  

async function handleFavorite(linkId, currentFavStatus) {
  try{
    const newFav = !currentFavStatus;
    
 await db.updateDocument("Links", linkId,{
      favList: newFav,
    });
    showSuccess('Added to favourite')
    // Refetch the data to update UI
 queryClient.invalidateQueries(['Link']);
  } catch(error) {
    console.error(error.message)
    showError(error.message);
  }
} 

function handleCopy() {
  if (url.length === 0) {
    showError("no text to copy");
    return;
  }
  const text = url;
  navigator.clipboard.writeText(text)
  .then(() => showSuccess('Copied!'))
  .catch(err => {
    showError('Copy failed');
    console.log(err)
  });
}

  return(
    <LinkContext.Provider value={{
    title,
    setTitle,
    url,
    setUrl,
    type,
    setType,
    description,
    setDescription,
    handleDelete,
    handleSave,
    loading,
    Clear,
    handleFavorite,
    fav,
    Edit,
    handleCopy,
    }}>
      {children}
    </LinkContext.Provider>
    )
}

export function useLink(){
  return useContext(LinkContext)
}