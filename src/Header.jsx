import user from './assets/user.png'
import darkColors from './darkColors.js';
import lightColors from './lightColors.js';
import db from './lib/util.jsx';

export default function Header() {
  return (
    <div>
      <nav style={{
        background:darkColors.background,
      }} className="p-[10px] flex justify-between items-center h-[80px] max-w-md">
        
        <div className="w-[80%] h-[100%] flex gap-3">
          
          <div className="ml-[10px] h-[60px] w-[60px] rounded-full overflow-hidden bg-red-200">
    <img src={user} alt="dp" className="w-[100%] h-[100%] Object-center" />
        </div>
        
    
        <div className="grid w-[150px]">
        <h3 style={{
          color:darkColors.textPrimary,
        }} className="font-bold text-2xl">welcome,</h3>
          <span style={{
             color:darkColors.textSecondary,
          }} className="font-semibold text-lg">{db.auth.getUser().data.userName}</span>
        </div>
        
        </div>
        
        
        <div className="mr-[5px] w-[60px] h-[60px] flex items-center justify-center">
          <button className="text-white font-medium w-[50px] h-[50px] rou rounded-[10px] bg-transparent">
            <i style={{
              fontSize:'24px'
            }} class="fa-solid fa-bars-staggered"></i>
          </button>
        </div>
        
        
      </nav>
    </div>
  );
}
