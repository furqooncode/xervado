import darkColors from '../darkColors.js';
import lightColors from '../lightColors.js';
import { useNavigate , Link } from 'react-router-dom';

export default function Text(){
  return(
    <div className="max-w-md">
      <div className="p-[10px] grid place-center items-center ">
        <input 
        type="text"
        placeholder="Texts/Notes Header"
        className="h-[65px] p-[10px] border border-purple-600 border-[3px] outline-none w-full text-2xl mb-[10px] rounded-[8px] bg-transparent font-bold"
        style={{
          color:darkColors.textPrimary
        }}
        />
         <textarea
        rows={5}
        cols={38}
        placeholder="Add your decription"
        style={{
    resize: 'none',
    overflow: 'hidden',
    color:'white',
    outline:'none',
    background:'transparent',
    fontSize:'14px',
          }}
        onInput={(e) => {
       e.target.style.height = 'auto';
      e.target.style.height = `${e.target.scrollHeight}px`;
  }}
/>
   </div>
    </div>
  
    )
}