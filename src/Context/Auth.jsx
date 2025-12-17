import { useState, useEffect } from 'react';
import { useContext, createContext } from 'react';
import db from '../lib/util.jsx'
export const Authcontext = createContext();

export default function Authprovider({children}){
  const [user, setuser] = useState(null);
  
  useEffect(()=> {
    db.auth.initAuth().then(()=>{
      if(db.auth.isAuthenticated()){
        setuser(db.auth.getUser())
      }
    });
  },[])
  
  const register = async(Email, userName, Password, phoneNumber)=>{
    await db.auth.register(Email, Password, {
      userName,
      phoneNumber:phoneNumber,
    })
    if(db.auth.isAuthenticated()){
        setuser(db.auth.getUser());
    }
  };
  
  const login = async(Email, Password)=>{
    await db.login(Email, Password)
    if(db.isAuthenticated()){
      setuser(db.user)
    }
  };
  
      
  return(
    <Authcontext.Provider value={{user, register, login}}>
      {children}
    </Authcontext.Provider>
    )
}

export const useAuth = () => useContext(Authcontext);