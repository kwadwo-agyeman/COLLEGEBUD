import React from 'react';
import { createContext,useContext,useState } from 'react';
const AuthContext = createContext({})
export const useAuth = ()=>{
    return useContext(AuthContext)
}
export const AuthProvider = ({children}) => {
const [auth,setAuth] = useState({});
const [profImg,setProfImg] = useState("");
console.log(auth)
  return (
    <AuthContext.Provider value={{auth,setAuth,profImg,setProfImg}}>
      {children}
    </AuthContext.Provider>
  )
}

