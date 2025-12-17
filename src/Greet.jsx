import darkColors from './darkColors.js';
import lightColors from './lightColors.js';
import db from './lib/util.jsx';

export default function Greet(){
  return(
    <div className="flex items-center max-w-md p-[10px]">
      <h3 style={{
        color:darkColors.text,
      }} className="capitalize text-center font-bold text-lg">HEY 👋
      {' '} {db.auth.getUser().data.userName }{' '}, What did you wanna save Today???</h3>
    </div>
    )
}