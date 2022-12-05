import React, { useState } from 'react'
import { Line } from "react-chartjs-2"
import "../Styles/chart.css"
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);
function CoinChart({ data }) {
  
  const { day, week, year,month, details } = data

  // switch case
  const [timeformat, setTimeFormat] = useState("")


  if (!day || !week || !year || !details) {
    return (
      <div>
        Loading...
      </div>
    )

  }
  // to switch between dates
  const determineTimeFormat = () => {
    switch (timeformat) {
      case "24h":
        return day
      case "7d":
        return week
      case "year":
        return year
      case "month":
        return month
      default:
        return day
    }
  }

  //chartjs config
  const dataforChart = {
    labels: determineTimeFormat().map((val) => {
      return val.t
    }),
    datasets: [
      {
        label: details.name,
        data: determineTimeFormat().map((val) => {
          return val.y
        }),
        borderColor: "rgb(53,152,235)",
        fill: false,
        pointRadius: 1
      }
    ]
  }

  //chartjs options
  const options = {
    responsive: true,
    maintainAspectRatio: false
  }


  return (
    <div className='chartContainer'>
      <h1 className='chartHeader'>{details.name} Details</h1>
      <div className='chartPriceContainer'>
        <span className='chartSpan'>Current Price</span>
        <span className='currentPrice'>{details.current_price}$</span>
        <span className='chartSpan'>Price Change 24h</span>
        <span className={details.price_change_percentage_24h < 0 ? "pricedown": "priceup"}>{details.price_change_percentage_24h}%</span>
      </div>
      <div className='lineChartContainer'>
        <Line data={dataforChart} options={options} className="lineChart" />
      </div>
      <div className='chartButtons'>
        <button onClick={() => setTimeFormat("24h")}>24h</button>
        <button onClick={() => setTimeFormat("7d")}>7d</button>
        <button onClick={() => setTimeFormat("month")}>30d</button>
        <button onClick={() => setTimeFormat("year")}>1y</button>
      </div>

    </div>
  )
}

export default CoinChart