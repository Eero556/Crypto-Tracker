import React from 'react'
import { useContext, useState, useEffect } from "react"
import { UserContext } from "../Context/LoginContext"
import axios from 'axios'
import coinGecko from '../axios/coinGecko'
import AddCoin from '../components/Addcoin'
import CloseIcon from '@mui/icons-material/Close';
import "../Styles/dashboard.css"
import { useNavigate } from "react-router-dom"
function Dashboard() {

  const { getUser, user } = useContext(UserContext)
  const { watchlist } = user

  const [coinlist, setCoinlist] = useState([])
  const [query, setQuery] = useState("")

  const navigate = useNavigate()



  const getData = async () => {

    const responce = await coinGecko.get("/coins/markets", {
      params: {
        vs_currency: "usd",
        per_page: 250
      }
    })
    setCoinlist(responce.data)
  }


  useEffect(() => {
    getData()


    // eslint-disable-next-line
  }, [])





  // addcoin to watchlist
  const addcoin = async (coinName) => {
    try {
      if (watchlist.includes(coinName)) {
        alert("Already in watchlist!")
      } else {
        await axios.post("http://localhost:4000/auth/watchlist", { coin: coinName }, { withCredentials: true })
        getUser()
      }

    } catch (err) {
      navigate("/auth/login")

    }

  }


  //filter coinlist
  const newList = coinlist.filter((val) => {
    return val.name.toLowerCase().includes(query.toLowerCase())
  })

  return (
    <div>
      <div className='searchBarContainer'>
        <input onChange={(e) => setQuery(e.target.value)} value={query} type={"text"} placeholder={"Search coins..."} />
        {query.length > 0 ? <CloseIcon onClick={() => setQuery("")} className='searchIcon' /> : ""}
      </div>
      <div>
        <div className='infoforcolumns'>
          <span>Price</span>
          <span>24h</span>
        </div>
        {newList.map((coin) => {
          return <AddCoin key={coin.id} coin={coin} addcoin={addcoin} />
        })}
      </div>
    </div>
  )
}

export default Dashboard