import Head from '../Head.jsx';
import darkColors from '../darkColors.js';
import lightColors from '../lightColors.js';
import { useNavigate, Link } from 'react-router-dom';
import { useDocument } from '../Context/DocumentContext.jsx';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import db from '../lib/util.jsx';
import DocumentInput from './fileInput.jsx';

export function DocList(){
  const [openMenuId, setOpenMenuId] = useState(null);
  const [Addfile, setAddfile] = useState(false);
  const User_Id = db.auth.getUser().id;
  const { ListToView, handleDelete } = useDocument();
  const navigate = useNavigate();
  
  const {data: fetched, isError, isPending, error} = useQuery({
    queryKey: ['Document', User_Id],
    queryFn: async() => {
      const res = await db.listDocuments("Document", {
        filters: {
          UserID: User_Id,
        }
      });
      return res;
    }
  });
  
  if(isPending){
    return(
      <div className="flex justify-center items-center h-[600px]">
        <p className="text-blue-500 font-l">Loading...</p>
      </div>      
    );
  }

  if(isError){
    return(
      <div className="flex justify-center items-center h-[600px]">
        <p className="text-blue-500 font-l">{error.message}</p>
      </div>    
    );
  }
  
  return(
    <div className="h-full max-w-md">
      <div>
        {!Addfile ? (
          !fetched || fetched.length === 0 ? (
            <div className="flex justify-center items-center h-[600px]">
              <p className="text-blue-500 font-l">No documents here yet...</p>
            </div>
          ) : (
            fetched.map(file => (
              <div className="relative p-[3px] mb-[-18px]" key={file.id}>
                <div 
                  className="max-w-md p-[7px] flex items-center gap-3 cursor-pointer" 
                  style={{
                    background: darkColors.list,
                    color: darkColors.text,
                  }}
                  onClick={() => {
                    ListToView({
                      fileId: file.id,
                      DocUrl: file.data.DocUrl,
                      Name: file.data.Name,
                      DocId: file.data.DocId,
                    });
                    navigate("/Viewfile");
                  }}
                >
                  <div className="p-3 rounded-lg bg-purple-600">
                    <i className="fas fa-file-alt"></i>
                  </div>

                  <div className="w-[70%]">
                    <div className="flex justify-between items-center">
                      <h3 className="text-base font-semibold w-[60%] truncate overflow-hidden whitespace-nowrap uppercase">
                        {file.data.Name}
                      </h3>
                      <span className="text-xs lowercase text-gray-300">{file.data.Time}</span>
                    </div>
                    <p
                      style={{
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap',
                      }}
                      className="text-sm text-gray-300"
                    >
                      {file.data.Description || 'No description'}
                    </p>
                  </div>
   
                  <div className="flex items-center justify-center h-[40px] w-[40px] p-2">
                    <button 
                      className="text-white text-lg font-semibold h-full w-full flex justify-end items-center" 
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuId(openMenuId === file.id ? null : file.id);
                      }}
                    >
                      <i className="fas fa-ellipsis-vertical"></i>
                    </button>
                  </div>
                </div>
      
                {/* Options menu */}
                {openMenuId === file.id && (
                  <div className="absolute w-[170px] bg-[#2A2A2A] top-[20px] right-[50px] z-50 rounded-md shadow-md">
                    <ul className="text-white text-sm">
                      <li className="list hover:bg-red-600 hover:text-white rounded-t-md">
                        <button 
                          className="w-full flex items-center gap-2 text-left px-4 py-2" 
                          onClick={(e) => {
                            e.stopPropagation();
                            alert('added to fav');
                            setOpenMenuId(null);
                          }}
                        >
                          <i className="far fa-heart"></i>
                          Add to Favourite
                        </button>
                      </li>
                      <li className="list hover:bg-green-600 hover:text-white rounded-b-md">
                        <button 
                          className="w-full flex items-center gap-2 text-left px-4 py-2" 
                          onClick={(e) => {
                            e.stopPropagation();
                            ListToView({
                              fileId: file.id,
                              DocUrl: file.data.DocUrl,
                              Name: file.data.Name,
                              DocId: file.data.DocId,
                            });
                            handleDelete(navigate);
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
          <DocumentInput onHide={() => setAddfile(false)} />
        )}
      </div>
    
      {/* This is for adding */}
      {!Addfile && (
        <div className="bg-purple-800 fixed right-[20px] bottom-[55px] z-index-100 h-[60px] w-[60px] rounded-[50%] flex justify-center items-center">
          <button 
            className="text-white font-bold text-3xl h-full w-full rounded-[50%]"
            onClick={() => {
              setAddfile(true);
            }}
          >
            <i className="fas fa-plus"></i>
          </button>
        </div>
      )}
    </div>
  );
}

export default function Addfile(){
  const navigate = useNavigate();
  
  return(
    <div>
      <Head topic="AddDocuments" handleback={() => {
        navigate("/Home");
      }}/>
      <DocList />
    </div>
  );
}