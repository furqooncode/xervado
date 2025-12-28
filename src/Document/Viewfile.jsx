import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Head from '../Head.jsx';
import darkColors from '../darkColors.js';
import { useDocument } from '../Context/DocumentContext.jsx';

export default function Viewfile(){
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const { mediaUrl, name, fileId, handleDelete } = useDocument();

  if (!mediaUrl) {
    return (
      <div style={{ background: darkColors.background }} className="min-h-screen flex justify-center items-center">
        <p className="text-red-500">No document data found</p>
      </div>
    );
  }

  const handleDownload = async () => {
    try {
      const response = await fetch(mediaUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${name || 'document'}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      alert('Download started!');
    } catch (error) {
      alert('Download failed: ' + error.message);
    }
  };

  return(
    <div style={{ background: darkColors.background }} className="min-h-screen">
      <Head topic="ViewDocument" handleback={() => {
        navigate("/Addfile");
      }}/>
      
      <div className="relative h-[calc(100vh-60px)]">
        {/* Top Right - Menu Button */}
        <button
          onClick={() => {
            setShowMenu(!showMenu);
          }}
          style={{ background: darkColors.list }}
          className="absolute top-4 right-4 z-10 h-[45px] w-[45px] rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity"
        >
          <i className="fas fa-ellipsis-v text-xl"></i>
        </button>

        {/* Menu Dropdown */}
        {showMenu && (
          <div 
            style={{ background: darkColors.list }}
            className="absolute top-[70px] right-4 z-20 rounded-lg shadow-lg py-2 w-[200px]"
          >
            <button
              onClick={() => {
                alert('Add to favorite');
                setShowMenu(false);
              }}
              className="w-full px-4 py-3 text-white hover:bg-purple-600 transition-colors flex items-center gap-3"
            >
              <i className="fas fa-heart"></i>
              <span>Add to favorite</span>
            </button>
            
            <button
              onClick={() => {
                handleDownload();
                setShowMenu(false);
              }}
              className="w-full px-4 py-3 text-white hover:bg-purple-600 transition-colors flex items-center gap-3"
            >
              <i className="fas fa-download"></i>
              <span>Download</span>
            </button>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete(navigate);
                setShowMenu(false);
              }}
              className="w-full px-4 py-3 text-white hover:bg-purple-600 transition-colors flex items-center gap-3"
            >
              <i className="fas fa-trash"></i>
              <span>Delete</span>
            </button>
          </div>
        )}

        {/* Document Preview with iframe */}
        <iframe 
          src={`https://docs.google.com/viewer?url=${encodeURIComponent(mediaUrl)}&embedded=true`}
          className="w-full h-full border-0"
          title={name || 'Document Preview'}
        />
      </div>
    </div>
  );
}