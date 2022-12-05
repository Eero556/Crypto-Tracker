import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import coinGecko from '../axios/coinGecko'
import CoinChart from '../components/Chart'
import CoinData from '../components/CoinData'
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
import { BsFillArrowLeftSquareFill } from "react-icons/bs";
function CoinDetailPage() {
  // get coinID using useParams
  const { id } = useParams()

  const [coin, setCoin] = useState({})

  const navigate = useNavigate()


  // format data to make x axis to data[0] and y axis to data[1]
  //moment to convert time to reable format
  const formatData = (data,time) =>{
    return data.map((val) =>{
      return {
        t:moment(val[0]).format(time),
        y:val[1].toFixed(2)
      }
    })
  }



  const getData = async () => {

    // Make all request go same time using promise.all
    const [day, week, year,month, details] = await Promise.all([
      coinGecko.get(`/coins/${id}/market_chart/`, {
        params: {
          vs_currency: "usd",
          days: "1"
        }
      }),
      coinGecko.get(`/coins/${id}/market_chart/`, {
        params: {
          vs_currency: "usd",
          days: "7"
        }
      }),
      coinGecko.get(`/coins/${id}/market_chart/`, {
        params: {
          vs_currency: "usd",
          days: "365"
        }
      }),
      coinGecko.get(`/coins/${id}/market_chart/`, {
        params: {
          vs_currency: "usd",
          days: "30"
        }
      }),
      coinGecko.get("/coins/markets",{
        params:{
          vs_currency: "usd",
          ids: id
        }
      })
    ])
    // set data
    setCoin({
      day: formatData(day.data.prices,"LT"),
      week: formatData(week.data.prices,"ll"),
      year: formatData(year.data.prices,"ll"),
      month: formatData(month.data.prices,"ll"),
      details:details.data[0] 
    })
    
  }

  useEffect(() => {
    getData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <div>
      <BsFillArrowLeftSquareFill onClick={() => navigate(-1)} className='backArrow'/>
      <CoinChart data={coin}/>
      <CoinData data={coin.details}/>
    </div>
  )
}

export default CoinDetailPage