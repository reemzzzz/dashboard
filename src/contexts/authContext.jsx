import { createContext, useContext, useEffect, useState } from "react";

const authContext = createContext(null);


export function AuthProvider({children}){
  const [user,setUser] = useState(()=>{
    try{
      const saved = localStorage.getItem("user");
      return saved?JSON.parse(saved):null;
    }
    catch{ //if it is an empty object
      localStorage.removeItem("user");
      return null;
    }
  });

  useEffect(()=> {
    if(user)
    {
      localStorage.setItem('user',JSON.stringify(user))
      console.log("user found in auth: ",user)
    }
    else 
      localStorage.removeItem('user');
  },[user])

  const isAuthenticated = !!user;
  
  const login = (userData) => {
    localStorage.setItem("user",JSON.stringify(userData));
    setUser(userData);
    console.log("In login -> authContext",userData)
  }

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
  }
  
  return (
    <authContext.Provider value={{ user,isAuthenticated,login,logout }}>
      {children}
    </authContext.Provider>
  )


}

export function useAuth(){
 return useContext(authContext)
} 