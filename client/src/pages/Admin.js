import React from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../Context/LoginContext"
import { useContext, useEffect, useState } from "react"
import "../Styles/profile.css"
function Admin() {
    const { user, setLoggedIn } = useContext(UserContext)
    const navigate = useNavigate()

    const [data, setData] = useState([])

    // get data from authenticated path
    const jotai = async () => {
        const responce = await axios.get("http://localhost:4000/auth", { withCredentials: true })
        setData(responce.data.data)
        console.log(responce)
    }


    useEffect(() => {
        jotai()
    }, [])


    if (data.length === 0) {
        return <div>hey</div>
    }

    // logout user and destroy token
    const logout = async () => {
        try {
            const responce = await axios.get("http://localhost:4000/auth/logout", { withCredentials: true })
            console.log(responce)
            navigate("/auth/login")
            setLoggedIn(null)
        } catch (err) {
            console.log(err)
        }
    }

    


    return (
        <div className="profileContainer">
            <h1 className="profileHeader">Hello {user.username}</h1>
            <p>Your user group is: {user.role}</p>
            <div className="profileWatchlist">
                <h1>You are following:</h1>
                {user.watchlist.map((val) => {
                    return <p key={val}>{val}</p>
                })}
            </div>
            <button className="logOutButton" onClick={logout}>Logout</button>
            <h1>Users:</h1>
            <div className='usersArray'>
                {data.map((user) => {
                    return <div className='Users' key={user.id}>
                        <p>ID: {user.id} Username: {user.username}</p>
                        <p>Watchlist: {user.watchlist.join(",  ")}</p>
                    </div>
                })}
            </div>


        </div>
    )
}

export default Admin