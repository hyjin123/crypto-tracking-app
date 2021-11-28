import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import "./portfolio.css";

import { Chart, registerables } from "chart.js";
import axios from "axios";
Chart.register(...registerables);

const LineChart = (props) => {
  const [transactionInfo, setTransactionInfo] = useState({});
  const [coinPriceHistory, setCoinPriceHistory] = useState({});

  const { holdings, userId } = props;

  // get the last 7 days in an array
  const dates = [...Array(7)].map((_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return d.toISOString();
  });

  // for each of the 7 days (array), send an ajax request to the back end
  // this request will be to the backend to get holdings information (coin and quantity) for each day
  // get ALL transactions for that user before that DATE
  useEffect(() => {
    // for each day of the 7 days, make a separate axios request to the backend to get all the transactions before that day
    for (const day of dates) {
      axios.get(`/api/coin/seven-day-transactions?userId=${userId}&day=${day}`)
      .then((res) => {
        setTransactionInfo((prev) => ({...prev, [day]: res.data.allTransactions}))
      })
      .catch(err => console.log(err))
    }
  }, [])

  console.log(transactionInfo);

  // go through the holdings and get the id of the coins in that holdings that have more than 1 quantity
  const existingCoins = [];
  for (const holding of holdings) {
    if(holding.holdings > 0) {
      existingCoins.push(holding.id)
    }
  }

  console.log(existingCoins)

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

  // set the label first with all the dates (7 days), in reverse order, so reversed the x-axis
  const reverseLabel = [];
  for (const info in transactionInfo) {
    reverseLabel.push(info.slice(0, 10))
  }
  // reverse the label to start the day from 7 days ago
  const label = reverseLabel.reverse();

  // now you have all the history transactions for each day and the price history for each coin for each day
  // day total balance = for each coin; holdings * day price
  // do this day by day for NOW

  useEffect(() => {
    const day7 = Object.keys(transactionInfo)[0];
    const day6 = Object.keys(transactionInfo)[1];
    const day5 = Object.keys(transactionInfo)[2];
    const day4 = Object.keys(transactionInfo)[3];
    const day3 = Object.keys(transactionInfo)[4];
    const day2 = Object.keys(transactionInfo)[5];
    const day1 = Object.keys(transactionInfo)[6];
    
    let day1Holdings = {};
    let day2Holdings = {};
    let day3Holdings = {};
    let day4Holdings = {};
    let day5Holdings = {};
    let day6Holdings = {};
    let day7Holdings = {};

    if (transactionInfo[day1]) {
      for (const transaction of transactionInfo[day1]) {
        if (transaction.type === "Buy") {
          if (day1Holdings[transaction.name])
          day1Holdings[transaction.name] += 1;
        } else {
          day1Holdings[transaction.name] = 1;
        }
        if (transaction.type === "Sell") {
          if (day1Holdings[transaction.name]) {
            day1Holdings[transaction.name] -= 1;
          }
        }
      }
    }

    // if (transactionInfo[day2]) {
    //   for (const transaction of transactionInfo[day1]) {
    //     if (transaction.type === "Buy") {
    //       if (day1Holdings[transaction.name])
    //       day1Holdings[transaction.name] += 1;
    //     } else {
    //       day1Holdings[transaction.name] = 1;
    //     }
    //     if (transaction.type === "Sell") {
    //       if (day1Holdings[transaction.name]) {
    //         day1Holdings[transaction.name] -= 1;
    //       }
    //     }
    //   }
    // }

    // if (transactionInfo[day3]) {
    //   for (const transaction of transactionInfo[day1]) {
    //     if (transaction.type === "Buy") {
    //       if (day1Holdings[transaction.name])
    //       day1Holdings[transaction.name] += 1;
    //     } else {
    //       day1Holdings[transaction.name] = 1;
    //     }
    //     if (transaction.type === "Sell") {
    //       if (day1Holdings[transaction.name]) {
    //         day1Holdings[transaction.name] -= 1;
    //       }
    //     }
    //   }
    // }

    // if (transactionInfo[day4]) {
    //   for (const transaction of transactionInfo[day1]) {
    //     if (transaction.type === "Buy") {
    //       if (day1Holdings[transaction.name])
    //       day1Holdings[transaction.name] += 1;
    //     } else {
    //       day1Holdings[transaction.name] = 1;
    //     }
    //     if (transaction.type === "Sell") {
    //       if (day1Holdings[transaction.name]) {
    //         day1Holdings[transaction.name] -= 1;
    //       }
    //     }
    //   }
    // }

    // if (transactionInfo[day5]) {
    //   for (const transaction of transactionInfo[day1]) {
    //     if (transaction.type === "Buy") {
    //       if (day1Holdings[transaction.name])
    //       day1Holdings[transaction.name] += 1;
    //     } else {
    //       day1Holdings[transaction.name] = 1;
    //     }
    //     if (transaction.type === "Sell") {
    //       if (day1Holdings[transaction.name]) {
    //         day1Holdings[transaction.name] -= 1;
    //       }
    //     }
    //   }
    // }

    // if (transactionInfo[day1]) {
    //   for (const transaction of transactionInfo[day1]) {
    //     if (transaction.type === "Buy") {
    //       if (day1Holdings[transaction.name])
    //       day1Holdings[transaction.name] += 1;
    //     } else {
    //       day1Holdings[transaction.name] = 1;
    //     }
    //     if (transaction.type === "Sell") {
    //       if (day1Holdings[transaction.name]) {
    //         day1Holdings[transaction.name] -= 1;
    //       }
    //     }
    //   }
    // }

    if (transactionInfo[day7]) {
      for (const transaction of transactionInfo[day7]) {
        if (transaction.type === "Buy") {
          if (day7Holdings[transaction.name.toLowerCase()]) {
            day7Holdings[transaction.name.toLowerCase()] += transaction.quantity;
          } else {
          day7Holdings[transaction.name.toLowerCase()] = transaction.quantity;
          }
        }
        if (transaction.type === "Sell") {
          if (day7Holdings[transaction.name.toLowerCase()]) {
            day7Holdings[transaction.name.toLowerCase()] -= transaction.quantity;
          } else {
            day7Holdings[transaction.name.toLowerCase()] = -(transaction.quantity);
          }
        }
    }
  }
    console.log(day7Holdings)

  // now you have ALL the holdings for that day!!
  // you also have historical price for all the holdings, somehow combine them


  }, [transactionInfo, coinPriceHistory])


  const state = {
    labels: label,
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
  }

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
