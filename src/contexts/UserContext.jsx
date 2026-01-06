import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({
    user:null,
    setUser: ()=>{}
});

export const UserProvider = ({children}) => {
    
    const [user,setUser] = useState(null);

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem("loggedUser")) || [];
        if(savedUser) {
            setUser(savedUser)
        }
    },[]);

    useEffect(()=>{
        if(user) {
            localStorage.setItem("loggedUser",JSON.stringify(user));
        } else {
            localStorage.removeItem("loggedUser");
        }
    },[user])

    return(
        <UserContext.Provider value={{user,setUser}}>
            {children}
        </UserContext.Provider>
    );
}
