

import Head from '../Head.jsx'
import darkColors from '../darkColors.js';
import lightColors from '../lightColors.js';
import { useNavigate , Link } from 'react-router-dom';
import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import Galleryinput from './GalleryInput.jsx';
import db from '../lib/util.jsx';
import { useGallery } from '../Context/GalleryContext.jsx';

export function GalleryList(){
  const [isAdd, setisAdd] = useState(false);
  const User_Id = db.auth.getUser().id;
  const queryClient = useQueryClient(); //for hot reload!!
  const { MediaPreview } = useGallery();
  const navigate = useNavigate();
  const {data : fetched, isError, isPending, error} = useQuery({
    queryKey:['Gallery', User_Id],
    queryFn: async()=>{
    const res = await db.listDocuments("Gallery", {
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
    <div>
      {/*gallery*/}
{!isAdd ? (
    !fetched || fetched.length === 0 ? (
    <div className="flex justify-center items-center h-[600px] ">
        <p className="text-blue-500 font-l">No notes/texts here yet...</p>
      </div>
   ) :(
   <div className="flex flex-wrap gap-[3px] pr-[2px]">
  {fetched.map((media, index) => (
  media.data.GalleryType === 'image' ? (
   <div key={media.id} style={{
     background: darkColors.list
   }} 
   className="list w-[65px] h-[70px] mr-[2px] mb-[2px] ml-[2px]" 
         onClick={()=>{
  MediaPreview({
    list: fetched.map(m => ({
      ...m.data,  // Spread all data (GalleryId, GalleryUrl, GalleryType, Name, Description, Time)
      fileId: m.id  // Add the document ID
    })),
    index: fetched.findIndex(m => m.id === media.id)
  });
  navigate("/ViewGallery")
}}>
     
    <img src={media.data.GalleryUrl} alt="hust" className="h-full w-full object-center" 
    onContextMenu={(e)=>{
              e.preventDefault();
    }}
    /> 
      </div>
  ) : (
     <div key={media.id} style={{
    background: darkColors.list,
  }} className="list relative w-[65px] h-[70px] mr-[2px] mb-[2px] ml-[2px]"
         onClick={()=>{
  MediaPreview({
    list: fetched.map(m => ({
      ...m.data,  // Spread all data (GalleryId, GalleryUrl, GalleryType, Name, Description, Time)
      fileId: m.id  // Add the document ID
    })),
    index: fetched.findIndex(m => m.id === media.id)
  });
  navigate("/ViewGallery")
}}>
       <video src={media.data.GalleryUrl}  className="w-full h-full object-cover "/> 
       <div className="absolute top-[15px] right-[15px] h-[40px] w-[40px]
       bg-black rounded-[50%] text-white flex justify-center items-center
       font-bold text-3xl" >
   <i className="fas fa-play-circle"></i>
         </div>
      </div>
  )
  ))}
       </div> 
    )
):(
    <div>
  <Galleryinput onHide={()=>{
       setisAdd(false)
     }}/>
      
    </div>

)}

      
      {/*for adding*/}
         <div className="bg-purple-800 fixed right-[20px] bottom-[55px] z-index-100 h-[60px] w-[60px] rounded-[50%] flex justify-center items-center">
        <button className="text-white font-bold text-3xl h-full w-full rounded-[50%]"
        onClick={() => {
         setisAdd(true);
        }}
        >
         <i className="fas fa-plus"></i>
        </button>
      </div>
      
      
   
    </div>
    )
}

export default function Addgallery(){
  const navigate = useNavigate();
  return(
     <div>
  <Head topic="AddGallery" handleback={()=>{
       navigate("/Home")
  }}/>
     <GalleryList />
    </div>
    )
}