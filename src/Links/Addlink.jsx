import Head from '../Head.jsx'
import darkColors from '../darkColors.js';
import lightColors from '../lightColors.js';
import { useNavigate , Link } from 'react-router-dom';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Linkinput from './LinkInput.jsx';
import { useLink } from '../Context/LinkContext.jsx';
import db from '../lib/util.jsx';
import { showSuccess, showError } from '../Alert/darktoast.jsx';
 
export function List(){
  const navigate = useNavigate();
  const [openMenuId, setOpenMenuId] = useState(null);
  const { handleDelete, handleFavorite, fav, Edit, handleCopy, Clear} = useLink()
  const User_Id = db.auth.getUser().id;
  const [isAdd, setIsAdd] = useState(false);
  
  const {data : fetched, isError, isPending, error} = useQuery({
    queryKey:['Link', User_Id],
    queryFn: async()=>{
      const res = await db.listDocuments("Links", {
        filters:{
          UserID: User_Id,
        }
      });
      return res;
    }
  })
  
  
  if(isPending){
    return(
      <div className="flex justify-center items-center h-[600px] ">
        <p className="text-blue-500 font-l">Loading...</p>
      </div>      
    )
  }

  if(isError){
    return(
      <div className="flex justify-center items-center h-[600px] ">
        <p className="text-blue-500 font-l">{error.message}</p>
      </div>    
    )
  }
  
  return(
    <div className="p-[5px]">
      {!isAdd ? (
        !fetched || fetched.length === 0 ? (
       <div className="flex justify-center items-center h-[600px]">
            <p className="text-blue-500 font-l">No documents here yet...</p>
          </div>
        ) : (
          fetched.map(link => (
            <div className="relative grid gap-2 p-3 w-full rounded-md overflow-hidden mb-3" style={{
              background:darkColors.list,
            }} key={link.id} onClick={()=>{
              Edit({
                id: link.id,
                Title: link.data.Title,
                Type: link.data.Type,
                Url: link.data.Url,
          Description:link.data.Description
              })
              setIsAdd(true)
            }}>
              
              {/*head*/}
              <div className="flex justify-between w-[100%]">
                
                <div className=" flex-1 max-w-[90%]">
                  <span className="w-full text-2xl font-bold text-white">
                    {link.data.Title}
                  </span><br />
                  <span className="text-sm uppercase text-gray-300">Created at: {link.data.Time}</span><br />
                  <span className="truncate text-sm uppercase text-gray-300">URL FOR: {link.data.Type}</span>
                </div>
                
                <div className="flex items-center justify-center h-[40px] w-[40px] p-2 flex-shrink-0">
                  <button className="text-white text-lg font-semibold h-full w-full flex justify-end items-center"
                  onClick={(e)=>{
         e.stopPropagation();
    setOpenMenuId(openMenuId === link.id ? null : link.id);
                  }}
                  >
                    <i className="fas fa-ellipsis-vertical"></i>
                  </button>
                </div>
                
              </div>
              
              {/*link readonly input */}
              <div className="relative flex gap-2 w-full items-center">
                <input
                  type="text"
                  value={link.data.Url}
                  readOnly
                  className="w-full p-[8px] pr-[50px] bg-black/90 text-white font-semibold rounded-md outline-none"
                />
      <button className="absolute right-2 w-[30px] h-[35px] rounded text-white bg-purple-800 outline-white"
      onClick={(e)=>{
      e.stopPropagation();
    navigator.clipboard.writeText(link.data.Url)
      .then(() => showSuccess('✓ Copied!'))
      .catch(err =>{
        showError('Copy failed');
        console.log(err.message)
      });
      }}>
                  <i className="fas fa-copy text-white"></i>
                </button>
              </div>
              
              {/*description*/}
              <div className="mt-[5px] w-full">
                <i className="text-xs lowercase text-gray-300">
                  {link.data.Description}
                </i>
              </div>
              
        {openMenuId === link.id && (
        <div 
    className="absolute w-[170px] bg-[#2A2A2A] top-[20px] right-[50px] z-50 rounded-md shadow-md"
  >
    <ul className="text-white text-sm">
      <li className="list hover:bg-red-600 hover:text-white rounded-t-md">
       <button 
  className="w-full flex items-center gap-2 text-left px-4 py-2" 
  onClick={(e) => {
    e.stopPropagation();
    setOpenMenuId(null);
    handleFavorite(link.id, link.data.favList);
  }}
>
  <i className={link.data.favList ? "fas fa-heart" : "far fa-heart"}></i>
  {link.data.favList ? "Remove from favorite" : "Add to favorite"}
</button>

      </li>
      
      <li className="list hover:bg-green-600 hover:text-white rounded-b-md">
        <button 
          className="w-full flex items-center gap-2 text-left px-4 py-2" 
          onClick={(e) => {
            e.stopPropagation();
          handleDelete(link.id)
            setOpenMenuId(null);
          }}
        >
          <i className="fas fa-trash-alt"></i>
          Delete
        </button>
      </li>
    </ul>
  </div>
)}
       
              
            </div>
          ))
        )
      ) : (
        <Linkinput onHide={() => {
          setIsAdd(false)
           Clear();
        }} />
      )}

      {/**for adding*/}
      <div className="bg-purple-800 fixed right-[20px] bottom-[55px] z-index-100 h-[60px] w-[60px] rounded-[50%] flex justify-center items-center">
        <button className="text-white font-bold text-3xl h-full w-full rounded-[50%]"
        onClick={() => {
          setIsAdd(true)
          Clear();
        }}
        >
          <i className="fas fa-plus"></i>
        </button>
      </div>
      
    </div>
  )
  
}

export default function Addlink(){
  const navigate = useNavigate();
  return(
    <div>
      <Head topic="Addlinks" handleback={() => {
        navigate("/Home")
      }}/>
      <List />
    </div>
  )
}
