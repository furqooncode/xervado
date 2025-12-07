import darkColors from './darkColors.js';
import lightColors from './lightColors.js';

export default function Greet(){
  return(
    <div className="flex items-center max-w-md p-[10px]">
      <h3 style={{
        color:darkColors.text,
      }} className="capitalize text-center font-bold text-lg">HEY👋 Furqoon code, What did you wanna save Today???</h3>
    </div>
    )
}