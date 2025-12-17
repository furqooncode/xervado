import { useState } from 'react';
import darkColors from '../darkColors.js';
import { useAuth } from '../Context/Auth.jsx'
import { useNavigate , Link } from 'react-router-dom'

export default function Login() {
  const { login } = useAuth();
  const [Email, setEmail] = useState('');
const [Password, setPassword] = useState('');
const [loading, setload] = useState(false)
 const navigate = useNavigate()
 
async function handlesubmit(e){
  e.preventDefault();
  try{
     setload(true)
    await login(Email, Password);
    alert('logged in successfull')
    navigate("/Home")
  }catch(error){
    alert(error.message)
    setload(false)
  }
}
  return (
    <div
      style={{ background: darkColors.background }}
      className="min-h-screen flex items-center justify-center px-4"
    >
      <div className="w-full max-w-md bg-[#1c1c1e] p-6 rounded-xl shadow-lg">
        <h2 className="text-white text-2xl font-bold mb-6 text-center">
          Welcome back to Xervado
        </h2>

        <form onSubmit={handlesubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={Email}
            className="w-full p-3 rounded-md bg-[#2c2c2e] text-white placeholder-gray-400 outline-none"
            onChange={(e)=>{
              setEmail(e.target.value)
            }}
          />
          <input
            type="password"
            placeholder="Password"
            value={Password}
            className="w-full p-3 rounded-md bg-[#2c2c2e] text-white placeholder-gray-400 outline-none"
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
          />

          <button
            type="submit"
            className="w-full bg-purple-600 text-white p-3 rounded-md
            hover:bg-purple-700 transition font-bold text-lg"
          >
            {loading ? "Logging user..." : "Login"}
          </button>
        </form>

        <p className="text-sm text-gray-400 text-center mt-4">
          Don’t have an account? <Link to="/" className="text-purple-400
          underline cursor-pointer">Signup</Link>
        </p>
      </div>
    </div>
  );
}
