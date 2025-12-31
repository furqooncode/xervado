import darkColors from '../darkColors.js';
import lightColors from '../lightColors.js';
import Head from '../Head.jsx'
import Text from './InputText.jsx';
import { useNavigate , Link } from 'react-router-dom';
import db from '../lib/util.jsx';
import { useNote } from '../Context/NoteContext.jsx';

export default function Notes(){
  const { handleNoteSaves, ClearNotes , handleCopy} = useNote()
  const navigate = useNavigate();
  return(
    <>
    <Head topic="Notes/Texts" 
    save={<button className="h-[38px] w-[38px] text-xl font-bold text-white bg-teal-600 rounded-[5px]"
    onClick={handleNoteSaves}
    >
 <i className="fas fa-check text-white "></i>
</button>} 
    
    copy={<button 
    className="h-[38px] w-[38px] text-xl font-bold bg-purple-800 rounded-[5px]"
    onClick={handleCopy}
    >
 <i className="fas fa-copy text-white"></i>
</button>} 

      handleback={()=>{
       navigate("/Addnote");
       ClearNotes();
  }} 
/>
    <Text /> 
    </>

    )
}