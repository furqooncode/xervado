import darkColors from './darkColors.js';
import lightColors from './lightColors.js';
import React, { useEffect } from 'react';
import { Toaster } from 'react-hot-toast'; // Add this import
import Home from './Home.jsx'
import Notes from './Diary/Notes.jsx'
import Addnote from './Diary/Addnote.jsx';
import Addgallery from './Gallery/Addgallery.jsx';
import Galleryinput from './Gallery/GalleryInput.jsx';
import ViewGallery from './Gallery/Viewgallery.jsx';
import Addfile from './Document/Addfile.jsx';
import Addlink from './Links/Addlink.jsx';
import Linkinput from './Links/LinkInput.jsx';
import Viewfile from './Document/Viewfile.jsx';

import Signup from './Lock/Signup.jsx'
import Login from './Lock/Login.jsx'
import UpdateProfile from './Lock/Update.jsx'
import { Routes, Route } from 'react-router-dom'

export default function App() {
  {/*useEffect(() => {
    import('vconsole').then(({ default: VConsole }) => {
      new VConsole();
    });
  }, []); */}//VConsole "npm install vconsole"
  
  return (
    <div style={{
      background: darkColors.background,
    }} className="min-h-screen">
      {/* Add Toaster here */}
      <Toaster position="top-right" />
      
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Addfile" element={<Addfile />} />
        <Route path="Update/" element={<UpdateProfile />} />
        <Route path="/Addlink" element={<Addlink />} />
        <Route path="/ViewGallery" element={<ViewGallery />} />
        <Route path="/Viewfile" element={<Viewfile />} />
        <Route path="/Addgallery" element={<Addgallery />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Addnote" element={<Addnote />}/>
        <Route path="/Note" element={<Notes />} />
      </Routes>
    </div>
  );
}