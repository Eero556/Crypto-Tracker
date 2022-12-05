import { createContext } from "react";
import { useEffect,useState } from "react";
import axios from "axios";
import React from "react";

export const UserContext = createContext()

export const UserContextProvider = ({children}) => {
    const [user, setUser] = useState({})
    const [loggedin, setLoggedIn] = useState(null)

    const getUser = async () => {
        try {
            const responce = await axios.get("http://localhost:4000/auth/isLoggedin", { withCredentials: true })
            const loggedUser = responce.data.loggedinPerson.rows[0]
            setUser(loggedUser)
            setLoggedIn(true)
        } catch (err) {
            console.log(err)
        }

    }

    

    // get userdata when application refreshes
    useEffect(() => {
        getUser()
    }, [loggedin])

    

    return(
        <UserContext.Provider value={{user,setUser,loggedin,setLoggedIn,getUser}}>
            {children}
        </UserContext.Provider>
    )


   
}

