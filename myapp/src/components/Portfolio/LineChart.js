import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import "./portfolio.css";

import { Chart, registerables } from "chart.js";
import axios from "axios";
Chart.register(...registerables);

const LineChart = (props) => {
  const { holdings, userId } = props;

  const coinName = [];
  const holdingsAmount = [];
  // calculate the total holdings for each coin for chart data
  for (const holding of holdings) {
    coinName.push(holding.name);
    holdingsAmount.push(holding.current_price * holding.holdings);
  }

  // get the last 7 days in an array
  const dates = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d;
  });
  console.log(dates);

  // for each of the 7 days (array), send an ajax request to the back end
  // this request will be to the backend to get holdings information (coin and quantity) for each day
  // get ALL transactions for that user before that DATE

  useEffect(() => {
    axios.get(`/api/coin/seven-day-transactions?userId=${userId}&dates=${dates}`)
      .then((res) => {
        console.log(res.data)

      })
      .catch(err => console.log(err))
  }, [])

  // second request will be to Coingeko API getting the historical price data for the last 30 days, for every other day
  // put this in an array (15 items)

  const state = {
    labels: ["January", "February", "March", "April", "May"],
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

  // id = bitcoin
  // currency = usd
  // days = 30
  // interval daily
  // prices is all we really need here
  //https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=30&interval=daily

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

export default LineChart;
