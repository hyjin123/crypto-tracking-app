import React from "react";
import { Pie, Doughnut } from "react-chartjs-2";
import "./portfolio.css";

import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const DoughnutChart = (props) => {

  const { holdings } = props;

  const coinName = [];
  const holdingsAmount = [];
  // calculate the total holdings for each coin for chart data
  for (const holding of holdings) {
    coinName.push(holding.name);
    holdingsAmount.push((holding.current_price * holding.holdings));
  }

  const state = {
    labels: coinName,
    datasets: [
      {
        label: "Rainfall",
        backgroundColor: ["#B21F00", "#C9DE00", "#2FDE00", "#00A6B4", "#6800B4", "#0d4091", "#078747", "#7f8783"],
        hoverBackgroundColor: [
          "rgba(178, 30, 0, 0.5)",
          "rgba(201, 222, 0, 0.5)",
          "rgba(47, 222, 0, 0.5)",
          "rgba(0, 166, 180, 0.5)",
          "rgba(104, 0, 180, 0.5)",
          "rgba(13, 64, 145, 0.5)",
          "rgba(7, 135, 71, 0.5)",
          "rgba(127, 135, 131, 0.5)"
        ],
        data: holdingsAmount,
      },
    ],
  };

  return (
    <Doughnut
      data={state}
      width={800}
      height={400}
      options={{
        plugins: {
          legend: {
            display: true,
            position: "right",
            align: "center",
            labels: {
              font: {
                size: 20
              },
              padding: 20
            }
          },
        },
        maintainAspectRatio: false,
      }}
    />
  );
};

export default DoughnutChart;
