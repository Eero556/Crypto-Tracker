import React from 'react'
import "../Styles/coin.css"
import { FaSortUp, FaSortDown, FaTimesCircle } from "react-icons/fa";
import { Link } from 'react-router-dom';
function Coin({ coin,deleteCoin }) {
    return (
        <Link to={"/coins/"+coin.id}>
        <div className='coincontainer'>
            <li className='coin'>
                <div className='coinName'>
                    <img alt='coin_pic' src={coin.image} />
                    <label>{coin.name}</label>
                </div>
                
                <span className='price'>${coin.current_price}</span>
                <span className={coin.price_change_percentage_24h > 0 ? "up" : "down"}>{coin.price_change_percentage_24h > 0 ? <FaSortUp className='up' /> : <FaSortDown className='down' />}{coin.price_change_percentage_24h}{<FaTimesCircle onClick={(e) =>{
                    e.preventDefault()
                    deleteCoin(coin.id)
                }} className='deletebutton' />}</span>
            </li>
        </div>
        </Link>
    )
}

export default Coin