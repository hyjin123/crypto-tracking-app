import { React, useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "./portfolio.css";
import axios from "axios";

import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const LineChart1 = (props) => {
  const [coinPriceHistory, setCoinPriceHistory] = useState({});

  const { holdings } = props;

  console.log(holdings);

  // get the last 7 days in an array
  const dates = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString();
  });
  
  // go through the holdings and get the id of the coins in that holdings that have more than 1 quantity
  const existingCoins = [];
  for (const holding of holdings) {
    if(holding.holdings > 0) {
      existingCoins.push(holding.id)
    }
  }

  console.log(existingCoins)

  const existingCoinHoldings = [];
  for (const holding of holdings) {
    if(holding.holdings > 0) {
      existingCoinHoldings.push(holding.holdings)
    }
  }

  console.log(existingCoinHoldings)

  // second request will be to Coingeko API getting the historical price data for the last 7 days
  // put this in an array (15 items)
  // https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7&interval=1
  useEffect(() => {
    for (const coin of existingCoins) {
      axios.get(`https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=6&interval=daily`)
      .then((res) => {
        setCoinPriceHistory((prev) => ({ ...prev, [coin]: res.data.prices}))
      })
      .catch(err => console.log(err))
    }
    }
  , [])

  console.log(coinPriceHistory);
  
  const state = {
    labels: ["1", "2", "3", "4", "5"],
    datasets: [
      {
        label: "Total Balance",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "#1976d2",
        borderWidth: 1,
        backgroundColor: "#1976d2",
        borderColor: "white",
        data: [65, 59, 80, 81, 56],
      },
    ],
  };

  return (
    <Line
      data={state}
      options={{
        plugins: {
          title: {
            display: true,
            text: "Total Balance (30 days)",
            fontSize: 20,
          },
          legend: {
            display: true,
            position: "right",
          },
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: "Day",
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: "Total Balance ($)",
            },
          },
        },
      }}
    />
  );
};

export default LineChart1;
