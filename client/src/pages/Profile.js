import React from 'react'
import { UserContext } from "../Context/LoginContext"
import { useContext } from "react"
import "../Styles/profile.css"
import Admin from './Admin'
import User from './User'
function Profile() {

    const { user } = useContext(UserContext)
    return (
        <div className="profile">
            {user.role === "admin" ? <Admin/> : <User/>}
        </div>
    )
}

export default Profile