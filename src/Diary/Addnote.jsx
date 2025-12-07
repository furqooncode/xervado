import Head from './Head.jsx'
import darkColors from '../darkColors.js';
import lightColors from '../lightColors.js';
import { useNavigate , Link } from 'react-router-dom';
export function TextList(){
  const navigate = useNavigate();
  return(
  <div className="h-full max-w-md">
    
    <template>
      <div className="flex justify-center items-center h-[600px] ">
        <p className="text-blue-500 font-l">No notes/texts here yet...</p>
      </div>
    </template>
      

<div className="p-[10px] mb-[-15px]">
  <div  className="max-w-md p-4 rounded-xl flex items-center gap-3" 
  style={{
     background:darkColors.container,
     color:darkColors.text,
  }}
  >
   <div className="p-3 rounded-lg bg-purple-600">
    <i className="fas fa-pen-to-square"></i>

        </div>

        <div className="w-[70%]">
          <div className="flex justify-between items-center">
   <h3 className="text-base font-semibold w-[60%] truncate overflow-hidden whitespace-nowrap uppercase">MY NOTE OF head of eden </h3>
   
   <span className="text-xs lowercase text-gray-300">nov,05 2025</span>
          </div>
 
      <p
      style={{
        textOverflow:'ellipsis',
        overflow:'hidden',
        whiteSpace:'nowrap',
      }}
     className=" text-sm text-gray-300">
  This is where the the note text will be of evergthing we imput , so no works for the lazy man  , qll works no play makes jack a dull biy 
</p>
   </div>
   
   <div className="flex items-center justify-center h-[40px] w-[40px] p-2">
     <button className="text-white text-lg font-semibold h-full w-full flex justify-center items-center">
       <i className="fas fa-ellipsis-vertical"></i>
     </button>
   </div>
   
      </div>
</div>
    
    

      <div className="bg-purple-800 fixed right-[20px] bottom-[55px] z-index-100 h-[60px] w-[60px] rounded-[50%] flex justify-center items-center">
        <button className="text-white font-bold text-3xl h-full w-full rounded-[50%]"
        onClick={() => {
          navigate("/Note")
        }}
        >
          <i className="fas fa-plus"></i>
        </button>
      </div>
      
    </div>
    )
}

export default function Addnote(){
  const navigate = useNavigate();
  return(
    <div>
  <Head topic="Addnote" handleback={()=>{
       navigate("/")
  }}/>
       <TextList />
       <TextList />
       <TextList />
       <TextList />
       <TextList />
       <TextList />
       <TextList />
       <TextList />
       <TextList />
       <TextList />
       <TextList />
       <TextList />
       <TextList />
       <TextList />
       <TextList />
       <TextList />
       <TextList />
       <TextList />
    </div>
    )
}