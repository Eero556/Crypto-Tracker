import React from 'react'
import {useEffect,useState,useContext} from "react"
import coinGecko from '../axios/coinGecko'
import {UserContext} from "../Context/LoginContext"
import Coin from '../components/Coin'
import "../Styles/coinlist.css"
import axios from 'axios'
function CoinList() {
  const {user,getUser} = useContext(UserContext)
  //get user Watchlist
  const {watchlist} = user

  const [coins,setCoins] = useState([])
  const [isLoading,setIsLoading] = useState(false)




  const getData = async() =>{
    setIsLoading(true)
    
    const responce = await coinGecko.get("/coins/markets",{
      params:{
        vs_currency: "usd",
        ids: watchlist.join(",")
      }
    })
    setCoins(responce.data)
    setIsLoading(false)
  }
//
  useEffect(() =>{
 

    if(watchlist.length > 0){
      getData()
    }
    
    // eslint-disable-next-line
  },[])

  const deleteCoin = async(CoinId) =>{
    try{
      await axios.delete("http://localhost:4000/auth/watchlist/"+CoinId,{withCredentials:true})
      const filteredArray = coins.filter((coin) => coin.id !== CoinId)
      setCoins(filteredArray)
      getUser()
    }catch(err){
      console.log(err)
    }
  }


  if(isLoading){
    return <div>Loading...</div>
  }


  return (
    <div className='coinlist'>
      <h1 className='coinlistHeader'>{watchlist.length > 0 ? "Your Watchlist" : "Your List is empty"}</h1>
      {coins.map(coin =>{
      return <Coin key={coin.id} coin={coin} deleteCoin={deleteCoin}/>
    })}</div>
  )
}

export default CoinList