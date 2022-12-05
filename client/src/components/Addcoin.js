import React from 'react'
import "../Styles/addcoin.css"
import { FaSortUp, FaSortDown } from "react-icons/fa";
import { BsFillHeartFill } from "react-icons/bs";
import { Link } from 'react-router-dom';
import {useContext} from "react"
import { UserContext } from '../Context/LoginContext';
function AddCoin({ coin,addcoin }) {
    //useContex
    const {user,loggedin} = useContext(UserContext)
    const {watchlist} = user


    if(!coin){
        return <div>Loading...</div>
    }

    return (
        <Link to={"/coins/"+coin.id}>
        <div className='coincontaineradd'>
            <li className='coinadd'>
                <div className='coinInfo'>
                    <img alt='' src={coin.image} />
                    <label>{coin.name}</label>
                </div>
                <span className='price'>${coin.current_price}</span>
                <span className={coin.price_change_percentage_24h > 0 ? "up" : "down"}>{coin.price_change_percentage_24h > 0 ? <FaSortUp className='up' /> : <FaSortDown className='down' />}{coin.price_change_percentage_24h}%</span>
                <span className={loggedin && watchlist?.includes(coin.id) ? "addButton" : "hidden"} onClick={(e) =>{
                    //preventDefault so can press button without going to details
                    e.preventDefault()
                    addcoin(coin.id)
                }}><BsFillHeartFill className='hearth'/></span>
            </li>
        </div>
        </Link>
    )
}

export default AddCoin