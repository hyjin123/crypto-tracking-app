import { React, useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "./portfolio.css";
import axios from "axios";

import { Chart, registerables } from "chart.js";
import TotalBalance from "./TotalBalance";
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
    if (holding.holdings > 0) {
      existingCoins.push(holding.id);
    }
  }

  const existingCoinHoldings = [];
  for (const holding of holdings) {
    if (holding.holdings > 0) {
      existingCoinHoldings.push(holding.holdings);
    }
  }

  // second request will be to Coingeko API getting the historical price data for the last 7 days
  // put this in an array (15 items)
  // https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=7&interval=1
  useEffect(() => {
    for (const coin of existingCoins) {
      axios
        .get(
          `https://api.coingecko.com/api/v3/coins/${coin}/market_chart?vs_currency=usd&days=7&interval=daily`
        )
        .then((res) => {
          setCoinPriceHistory((prev) => ({ ...prev, [coin]: res.data.prices }));
        })
        .catch((err) => console.log(err));
    }
  }, []);

  console.log(existingCoins);
  console.log(existingCoinHoldings);
  console.log(coinPriceHistory);

  // we now have all the holding coins in 1 array, all holding quantity in 1 array, history price in 1 object
  // existingCoins = [bitcoin, ethereum, cardano]
  // existingCoinHildings = [1, 1, 20010]
  // coinPriceHistory = { bitcoin: [40000, 40000, ....], ethereum: [4000, 4000... 5 more], cardano: [2, 2, .....5 more]}

  const daysBalanceCalculation = () => {
    let daysBalance = [0, 0, 0, 0, 0, 0, 0];

    // day 1
    for (let i = 0; i < existingCoins.length; i++) {
      daysBalance[0] +=
        existingCoinHoldings[i] * coinPriceHistory[existingCoins[i]][0][1];
    }

    // day 2
    for (let i = 0; i < existingCoins.length; i++) {
      daysBalance[1] +=
        existingCoinHoldings[i] * coinPriceHistory[existingCoins[i]][1][1];
    }

    // day 3
    for (let i = 0; i < existingCoins.length; i++) {
      daysBalance[2] +=
        existingCoinHoldings[i] * coinPriceHistory[existingCoins[i]][2][1];
    }

    // day 4
    for (let i = 0; i < existingCoins.length; i++) {
      daysBalance[3] +=
        existingCoinHoldings[i] * coinPriceHistory[existingCoins[i]][3][1];
    }

    // day 5
    for (let i = 0; i < existingCoins.length; i++) {
      daysBalance[4] +=
        existingCoinHoldings[i] * coinPriceHistory[existingCoins[i]][4][1];
    }

    // day 6
    for (let i = 0; i < existingCoins.length; i++) {
      daysBalance[5] +=
        existingCoinHoldings[i] * coinPriceHistory[existingCoins[i]][5][1];
    }
    
    console.log(coinPriceHistory)

    // day 7
    for (let i = 0; i < existingCoins.length; i++) {
      daysBalance[6] +=
        existingCoinHoldings[i] * coinPriceHistory[existingCoins[i]][6][1];
    }

    return daysBalance;
  };

  let finalData;

  if (
    Object.keys(coinPriceHistory).length === existingCoins.length &&
    existingCoins.length > 0
  ) {
    finalData = daysBalanceCalculation();
    console.log(finalData);
  }

  // Label slicing for better formatting on the x-axis
  const reverseLabel = [];
  for (const date of dates) {
    reverseLabel.push(date.slice(0, 10));
  }
  // reverse the label to start the day from 7 days ago
  const label = reverseLabel.reverse();

  const state = {
    labels: label,
    datasets: [
      {
        label: "Total Balance",
        fill: true,
        lineTension: 0.5,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "#1976d2",
        borderWidth: 1,
        backgroundColor: "#1976d2",
        borderColor: "white",
        data: finalData,
      },
    ],
  };

  return (
    <div className="line-chart">
      <Line
        data={state}
        options={{
          plugins: {
            title: {
              display: false,
              text: "Total Balance (7 day period)",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "right",
              labels: {
                color: "white"
              }
            },
          },
          scales: {
            x: {
              display: true,
              title: {
                display: true,
                text: "Day",
              },
              ticks: {
                color: "white"
              }
            },
            y: {
              display: true,
              title: {
                display: true,
                text: "Total Balance ($)",
              },
              ticks: {
                color: "white"
              }
            },
          },
          maintainAspectRatio: false,
        }}
      />
    </div>
  );
};

export default LineChart1;
