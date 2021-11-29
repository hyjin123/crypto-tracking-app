import { React, useEffect, useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import "../../App.css";
import "../Portfolio/portfolio.css";
import { useLocation, useNavigate } from "react-router";
import { Button } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const CoinHistory = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userId, setUserId] = useState(0);
  const [pricePerDay, setPricePerDay] = useState([]);
  const [days, setDays] = useState([]);

  const location = useLocation();
  const navigate = useNavigate();

  // this value is passed down from portfolio Link to Router
  const coinName = location.state.coinName;
  const lowerCoinName = coinName.toLowerCase();
  const marketCap = location.state.marketCap;
  const volume = location.state.volume;
  const image = location.state.image;
  const priceChange = location.state.priceChange;

  // retrieve the token from local storage, if empty string, you need to logged in.
  const token = localStorage.getItem("jwtToken");

  // authenticates the user and gets the user's infomation and store them in state
  useEffect(() => {
    axios
      .get("/isUserAuth", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        const user = res.data.user;
        setFirstName(user.first_name);
        setLastName(user.last_name);
        setUserId(user.id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // handles the back button click
  const handleBackButton = () => {
    navigate('/');
  };

  useEffect(() => {
    axios.get(`https://api.coingecko.com/api/v3/coins/${lowerCoinName}/market_chart?vs_currency=usd&days=30&interval=daily`)
      .then(res => {
        console.log(res.data.prices);
        const prices = res.data.prices;
        const pricePerDayArray = [];
        const daysArray = [];
        for (const price of prices) {
          
        }
      })
      .catch(err => console.log(err))
  }, [])

  const state = {
    labels: [1, 2, 3],
    datasets: [
      {
        label: "Daily Price",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "#1976d2",
        borderWidth: 2,
        backgroundColor: "#1976d2",
        borderColor: "white",
        data: [1, 2, 3],
      },
    ],
  };

  return (
    <div>
      <Navbar />
      <div className="portfolio-container">
        <div className="portfolio-header-container">
          <Button onClick={handleBackButton} 
          sx={{
            color: "#1976d2",
            backgroundColor: "black",
            border: "1px solid rgba(25, 118, 210, 0.5)",
              '&:hover': {
              border: "1px solid rgba(25, 118, 210, 1)",
              backgroundColor: "black"
            },
            position: "absolute",
            right: 370,
            top: 10
          }}>
            <ArrowBackIcon sx={{ fontSize: 30 }}/>
          </Button>
        </div>
        <div className="transaction-coin-info">
          <h1 className="transaction-title">{coinName} History</h1>
          <p className="transaction-name">{`( ${firstName} ${lastName} )`}</p>
          <img src={image} alt="crypto" className="coin-image"/>
          <p>{coinName}</p>
        </div>
      </div>
      <div className="line-history-chart">
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
                  color: "white",
                },
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
                  color: "white",
                },
                grid: {
                  color: "white",
                  lineWidth: 0.2,
                }
              },
              y: {
                display: true,
                title: {
                  display: true,
                  text: "Daily Price ($)",
                },
                ticks: {
                  color: "white",
                },
                grid: {
                  color: "white",
                  lineWidth: 0.2,
                }
              },
            },
            maintainAspectRatio: false,
          }}
        />
      </div>
    </div>
  );
};

export default CoinHistory;
