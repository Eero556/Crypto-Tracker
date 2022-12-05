import React from 'react'
import "../Styles/register.css"
import {registerSchema} from "../validations/Registervalidation"
import {useForm} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import {useState} from "react"

function Register() {

  const navigate = useNavigate()


  const[error,setError] = useState("")
  
  //ref register to use useform
  const {register,handleSubmit,formState:{errors}} = useForm({
    resolver: yupResolver(registerSchema),
  });


  const submitForm = async(data) =>{
    const registerData = {
      username: data.username,
      email: data.email,
      passhass: data.password,
      role: "user"
    }
    try{
      await axios.post("http://localhost:4000/auth/register",registerData)
      setError("")
      navigate("/auth/login")

    }catch(error){
      const errorMessage = error.response.data.status

      if(errorMessage === "Email exist!"){
        setError("Email exist!")
      }

      if(errorMessage === "Username exist!"){
        setError("Username exist!")
      }
     
    }

    
  }

  
  return (
    <div className='registerFormContainer'>
      <form onSubmit={handleSubmit(submitForm)} className='registerForm'>
        <h1 className='registerHeader'>Register</h1>
        <label>Username:</label>
        <input type={"text"} placeholder="username*" {...register("username")}/>
        {errors.username && <p className='registerError'>Min 4 letters and max 12 letters</p>}
        <label>Email:</label>
        <input type={"text"} placeholder="email@email.com*" {...register("email")}/>
        {errors.email && <p className='registerError'>Not valid email!</p>}
        <label>Password:</label>
        <input type={"password"} placeholder="password*" {...register("password")}/>
        {errors.password && <p className='registerError'>Min 6 letters</p>}
        <label>confirmpassword:</label>
        <input type={"password"} placeholder="confirmpassword*" {...register("confirmpassword")}/>
        {errors.confirmpassword && <p className='registerError'>Passwords do not match!</p>}
        <p className='registerError'>{error}</p>
        <input className='submitButton' type={"submit"}/>
      </form>
    </div>
  )
}

export default Register