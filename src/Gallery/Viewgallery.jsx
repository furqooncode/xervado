import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import darkColors from '../darkColors.js';
import { useGallery } from '../Context/GalleryContext.jsx';
import VideoPlayer from './videoplayer';

export default function ViewGallery() {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
const { mediaUrl, fileType, name, mediaId, currentIndex, galleryList,
MediaPreview, fileId, handleDelete } = useGallery();

if (!fileType) {
    return (
      <div style={{ background: darkColors.background }} className="min-h-screen flex justify-center items-center">
        <p className="text-red-500">No media data found</p>
      </div>
    );
  } 
  
  // Function to download media
   const handleDownload = async () => {
    try {
      const response = await fetch(mediaUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${name || 'download'}.${fileType === 'image' ? 'jpg' : 'mp4'}`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      alert('Download failed: ' + error.message);
    }
  };

  return (
    <div style={{
    background: darkColors.background }} className="h-screen flex flex-col"
    key={mediaId}>
      {/* Media Preview Section - 95% height */}
      <div className="relative h-[90vh] flex items-center justify-center">
        {/* Top Left - Close Button */}
        <button
          onClick={()=>{
            navigate("/Addgallery")
          }}
          style={{ background: darkColors.list }}
          className="absolute top-4 left-4 z-10 h-[45px] w-[45px] rounded-full flex items-center justify-center text-white hover:opacity-80 transition-opacity"
        >
          <i className="fas fa-times text-xl"></i>
        </button>

        {/* Top Right - Menu Button */}
        <button
          onClick={() => {
            setShowMenu(!showMenu)
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
                alert('Download');
                setShowMenu(false);
              }}
              className="w-full px-4 py-3 text-white hover:bg-purple-600 transition-colors flex items-center gap-3"
            >
              <i className="fas fa-download"></i>
   <span onClick={handleDownload}>Download</span>
            </button>
            
            <button
              onClick={(e) => {
              e.stopPropagation();
              handleDelete()
                alert('Delete');
                setShowMenu(false);
              }}
              className="w-full px-4 py-3 text-white hover:bg-purple-600 transition-colors flex items-center gap-3"
            >
              <i className="fas fa-trash"></i>
              <span>Delete</span>
            </button>
          </div>
        )}

        {/* Media Display */}
      
      {fileType === 'image' ? (
      <img
            src={mediaUrl}
            alt={name}
            className="w-full h-auto max-h-full object-contain"
            id={fileId}
            onContextMenu={(e)=>{
              e.preventDefault();
            }}
          />
      ): (
      
      <VideoPlayer 
      src={mediaUrl}
      id={fileId}
      />
      
      )}
          
      </div>

      {/* Bottom Navigation - 5% height */}
      <div style={{
      background: darkColors.list 
      }} 
      className="h-[10vh] flex items-center justify-between px-8">
        {/* Previous Button */}

          <button
  disabled={currentIndex === 0}
  onClick={() => {
    MediaPreview({
      list: galleryList,
      index: currentIndex - 1,
    });
  }}
    className="text-white hover:text-purple-400 transition-colors"
        >
          <i className="fas fa-chevron-left text-2xl"></i>
        </button>

        {/* Media Info */}
        <div className="text-white text-center">
          <p className="text-sm font-semibold">{name}.png</p>
        </div>

        {/* Next Button */}
        <button
        disabled={currentIndex === galleryList.length - 1}
     onClick={() => {
    MediaPreview({
      list: galleryList,
      index: currentIndex + 1,
    });
  }}
          className="text-white hover:text-purple-400 transition-colors"
        >
          <i className="fas fa-chevron-right text-2xl"></i>
        </button>
      </div>
    </div>
  );
}