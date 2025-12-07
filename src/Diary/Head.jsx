import darkColors from '../darkColors.js';
import lightColors from '../lightColors.js';

export default function Head({topic, copy, save, handleback}){
  return(
    <div className="pb-[50px]">
       <nav 
       style={{
         background:darkColors.container
       }}
       className="fixed w-full p-[10px] flex justify-between items-center h-[60px] top-0 left-0 z-index-100">
        
        <div className="w-[50%] h-full flex gap-2 items-center p-[5px]">
          <button
          className="h-[35px] w-[4
          35px] text-2xl font-bold text-white"
         onClick={handleback} ><i className="fas fa-chevron-left"></i>
 </button>
          <span className="text-l text-white">{topic}</span>
        </div>
        
        <div className="w-[35%] flex items-center justify-end gap-3 p-[5px] h-full">
          
          
        <div className="copy">
      {copy}
        </div>

<div className="save">
  {save}
</div>
        
        </div>
       
      </nav>
    </div>
    )
}