import React from 'react'
import "../Styles/coindata.css"
function CoinData({data}) {


    if(!data){
        return <div>Loading..</div>
    }
  return (
    <div className='coindataContainer'>
        <div className='MarketCap'>
            <span>Market Cap</span>
            <span>{data.market_cap}</span>
        </div>
        <div className='totalSupply'>
            <span>Total Supply</span>
            <span>{data.total_supply}</span>
        </div>
        <div className='totalVolume'>
            <span>Total Volume</span>
            <span>{data.total_volume}</span>
        </div>
        <div className='low24h'>
            <span>Low 24h</span>
            <span>${data.low_24h}</span>
        </div>
        <div className='high24h'>
            <span>High 24h</span>
            <span>${data.high_24h}</span>
        </div>
    </div>
  )
}

export default CoinData