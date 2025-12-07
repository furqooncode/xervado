import { useState } from 'react'
import darkColors from '../darkColors.js';
import { useAuth } from '../Context/Auth.jsx'

export default function Signup() {
  const { register } = useAuth();
    const [userName, setuserName] = useState('');
    const [Email, setEmail] = useState('');
const [Password, setPassword] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  
  async function handlesubmit(e){
    e.preventDefault();
    try{
      await register(Email, userName, Password, phoneNumber)
      alert('congratulations user')
    }catch(error){
      alert(error.message )
    }
  }
  
  return (
    <div
      style={{ background: darkColors.background }}
      className="min-h-screen flex items-center justify-center px-4"
    >
      <div className="w-full max-w-md bg-[#1c1c1e] p-6 rounded-xl shadow-lg">
        <h2 className="text-white text-2xl font-bold mb-6 text-center">
          Welcome to Xervado
        </h2>

        <form onSubmit={handlesubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 rounded-md bg-[#2c2c2e] text-white placeholder-gray-400 outline-none"
            value={userName}
            onChange={(e)=> {
              setuserName(e.target.value)
            }}
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-md bg-[#2c2c2e] text-white placeholder-gray-400 outline-none"
            value={Email}
            onChange={(e)=>{
              setEmail(e.target.value)
            }}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full p-3 rounded-md bg-[#2c2c2e] text-white placeholder-gray-400 outline-none"
            value={phoneNumber}
            onChange={(e)=>{
              setphoneNumber(e.target.value)
            }}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-md bg-[#2c2c2e] text-white placeholder-gray-400 outline-none"
            value={Password}
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
          />

          <button
            className="w-full bg-purple-600 text-white p-3 rounded-md hover:bg-purple-700 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-gray-400 text-center mt-4">
          Already have an account? <span className="text-purple-400 underline cursor-pointer">Login</span>
        </p>
      </div>
    </div>
  );
}
