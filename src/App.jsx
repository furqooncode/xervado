import darkColors from './darkColors.js';
import lightColors from './lightColors.js';
import Home from './Home.jsx'
import Notes from './Diary/Notes.jsx'
import Addnote from './Diary/Addnote.jsx'
import Signup from './Lock/Signup.jsx'
import Login from './Lock/Login.jsx'
import { Routes, Route } from 'react-router-dom'
export default function App() {
  return (
    <div style={{
      background:darkColors.background,
    }} className="min-h-screen">
      <Routes>
  <Route path="/" element={<Signup />} />
  <Route path="/Login" element={<Login />} />
  <Route path="/Home" element={<Home />} />
  <Route path="/Addnote" element={<Addnote />}/>
  <Route path="/Note" element={ <Notes />} />
 
      </Routes>
    </div>
  );
}