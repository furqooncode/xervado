import darkColors from './darkColors.js';
import lightColors from './lightColors.js';
import { useNavigate , Link } from 'react-router-dom';
import { useState } from 'react';
import { showSuccess, showError } from '../Alert/darktoast.jsx';

export function Animate({ duration = 600, Head, sub, icon, bg, handlemove,
isActive, onShow}) {
  return (
    <>
      <style>{`
        @keyframes fadeInSlide {
          0% { opacity: 0; transform: translateX(-100px); }
          100% { opacity: 1; transform: translateX(0); }
        }
        .animate-fadeInSlide {
          animation-name: fadeInSlide;
          animation-timing-function: ease-out;
          animation-fill-mode: forwards;
        }
      `}</style>

      <div
        className="max-w-md p-4 rounded-xl flex  gap-4 animate-fadeInSlide mb-[10px]"
        style={{ 
        animationDuration: `${duration}ms`,
       background:darkColors.container,
        color:darkColors.text,
        }}
        onClick={handlemove}
      >
     <div className={`${bg} p-3 rounded-lg h-[50px]`}>
          {icon}
        </div>

        <div>
          <h3 className="text-lg font-semibold">{Head}</h3>
        
           <p
             style={{
           display: '-webkit-box',
          WebkitLineClamp:isActive ? 'unset' : 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
  }}
  className="text-sm text-gray-300"
>
  {sub}
</p>

        </div>
        
        <div className="h-full w-50px flex justify-center">
          <button onClick={onShow}>
          {isActive ?
      ( <i class="fas fa-caret-up"></i> )
            :
       ( <i class="fas fa-caret-down"></i> )
          }
            </button>
        </div>
      </div>
    </>
  );
}


export default function Card() {
   const navigate = useNavigate();
   const [index, setindex] = useState(null)
  return (
    <div className="space-y-6 p-[10px]">
      <Animate duration={1200} icon={<i className="fas fa-book-open text-2xl"></i>} Head="Texts/Notes" sub="Securely store and organize your important notes and written content in one easy-to-access place." bg="bg-purple-600" handlemove={() =>(
        navigate("/Addnote")
      )}
      isActive={index === 0}
      onShow={(e) =>{
      e.stopPropagation();
        setindex(index === 0 ? null : 0)
      }}
      />
      
      
      <Animate duration={1400} icon={<i className="fas fa-photo-video text-2xl"></i>} Head="Images/Videos" sub="Easily save and manage your images and videos with fast access and reliable storage." bg="bg-pink-600"
      handlemove={()=> {
        navigate("/Addgallery")
      }}
      isActive={index === 1}
      onShow={(e) =>{
       e.stopPropagation();
        setindex(index === 1 ? null : 1)
      }}
      />
      
      
      <Animate duration={1600} icon={<i className="fas fa-file-alt text-2xl"></i>} Head="DOCs/PDF" sub="Securely store and organize all your documents: PDFs, text files, and more for quick retrieval anytime." bg="bg-yellow-500"
      handlemove={()=>{
        navigate("/Addfile")
      }}
      isActive={index === 2}
      onShow={(e) =>{
       e.stopPropagation();
       setindex(index === 2 ? null : 2)
      }}
      />
      
      <Animate duration={1800} icon={<i className="fas fa-link text-2xl"></i>} Head="Links" sub="Save and manage all your important web links in one place for easy access and sharing." bg="bg-indigo-500"
      isActive={index === 3}
      handlemove={()=>{
        navigate("/Addlink")
      }}
      onShow={(e) =>{
       e.stopPropagation();
        setindex(index === 3 ? null : 3)
      }}
      />
      
      <Animate duration={2000} icon={<i className="fas fa-code text-2xl"></i>} Head="Xervado Encoder" sub="Upload any file ,images, videos, docs and instantly generate a secure, shareable link for easy access anytime, anywhere." bg="bg-blue-500"
      isActive={index === 4}
      onShow={(e) =>{
       e.stopPropagation();
        setindex(index === 4 ? null : 4)
      }}
      handlemove={()=>{
        showError("opps sorry, under maintainace")
      }}
      />
      
      <Animate duration={2200} icon={<i className="fas fa-heart text-2xl"></i>} Head="Favourite" sub="Easily access and manage all your liked items in one place for quick retrieval and review." bg="bg-red-500"
      isActive={index === 5}
      onShow={(e) =>{
       e.stopPropagation();
        setindex(index === 5 ? null : 5)
      }}
      handlemove={()=>{
        showError("opps sorry, under maintainace")
      }}
      />
      
      <Animate duration={2400} icon={<i className="fas fa-user text-2xl"></i>} Head="Profile" sub="Manage your personal information, settings, and preferences to customize your experience." bg="bg-teal-600"
      isActive={index === 6}
      onShow={(e) =>{
       e.stopPropagation();
        setindex(index === 6 ? null : 6)
      }}
      handlemove={()=>{
        showError("opps sorry, under maintainace")
      }}
      />
      
      
    </div>
  );
}