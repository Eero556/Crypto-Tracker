import React, { useContext } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import { useState } from "react"
import { UserContext } from '../Context/LoginContext'
import "../Styles/login.css"
function Login() {

  const navigate = useNavigate()
  //useContext
  const {setLoggedIn} = useContext(UserContext)
  
  

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error,setError] = useState(null)



  const onsubmit = async(e) => {
    e.preventDefault()

    try {
      const loginData = {
        email: email,
        passhass: password
      }
      await axios.post("http://localhost:4000/auth/login",loginData,{withCredentials:true})
      setLoggedIn(true)
      setError(null)
      navigate("/dashboard")
    } catch (error) {
      console.log(error)
      setError(true)
    }


  }

  return (
    <div className='loginformcontainer'>
      <form onSubmit={onsubmit} className='loginForm'>
        <h1 className="loginHeader">Login</h1>
        <label>Email:</label>
        <input onChange={(e) => setEmail(e.target.value)} type={"text"} placeholder="email" />
        <label>Password:</label>
        <input onChange={(e) => setPassword(e.target.value)} type={"password"} placeholder="password" />
        {error ? <p className='errorLogin'>Wrong credentials!</p> : ""}
        <button className='submitButton' type={"submit"}>Login</button>
      </form>
    </div>
  )
}

export default Login