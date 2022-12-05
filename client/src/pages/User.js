import React from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../Context/LoginContext"
import { useContext } from "react"
import "../Styles/profile.css"

function User() {

    const { user, setLoggedIn} = useContext(UserContext)

    const navigate = useNavigate()


    // logout user and destroy token
    const logout = async () => {
        try {
            await axios.get("http://localhost:4000/auth/logout", { withCredentials: true })
            setLoggedIn(null)
            navigate("/auth/login")
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="profileContainer">
            <h1 className="profileHeader">Hello {user.username}</h1>
            <p>Your usergroup is: {user.role}</p>
            <div className="profileWatchlist">
                <h1 style={{color:"whitesmoke"}}>You are following:</h1>
                {user.watchlist.map((val) =>{
                    return <p key={val}>{val}</p>
                })}
            </div>
            <button className="logOutButton" onClick={logout}>Logout</button>
        </div>
    )
}

export default User