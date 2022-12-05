import React, { useEffect, useState } from 'react'
import { Link, useLocation } from "react-router-dom"
import "../Styles/navbar.css"
import Button from "@material-ui/icons/Reorder"
import Clear from "@material-ui/icons/Clear"
import { UserContext } from "../Context/LoginContext"
import { useContext } from "react"

function Navbar() {

  //context user = username
  const {user,loggedin} = useContext(UserContext)


  // To open navbar from burgericon
  const button_logic = () => {
    setExpandNavbar((prev) => !prev);
  }
  const [expandNavbar, setExpandNavbar] = useState("false")
  const location = useLocation();
  // if location changes then set navbar variable to false(collapse)
  useEffect(() => {
    setExpandNavbar(false);
  }, [location])

  return (
    <nav className='navbar' id={expandNavbar ? "open" : "close"}>
      <div className='toggleButton'>
        <button className='hamburger' onClick={button_logic}><Button /></button>
        <button onClick={button_logic} className='cross'><Clear /></button>
      </div>
      <Link to={'/dashboard'} className="navbar-name">{loggedin ? user.username: <p>Welcome</p>}</Link>
      <div className='links'>
        {!loggedin ? <><Link to={"/auth/login"}>Login</Link>
          <Link to={"/auth/register"}>Register</Link>
          <Link to={'/dashboard'}>Cryptos</Link>
          </> : <>
          <Link to={"/watchlist"}>Watchlist</Link>
          <Link to={'/dashboard'}>Cryptos</Link>
          <Link to={"/profile"}>Profile</Link>
          </>}
      </div>
    </nav>
  )
}

export default Navbar