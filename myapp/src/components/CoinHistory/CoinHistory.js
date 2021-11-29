import { React, useEffect, useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import "../../App.css";
import "../Portfolio/portfolio.css";
import { useLocation, useNavigate } from "react-router";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box } from "@mui/system";
import TabContext from "@mui/lab/TabContext";
import { Tabs, Tab } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

const CoinHistory = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userId, setUserId] = useState(0);
  const [pricePerDay, setPricePerDay] = useState([]);
  const [days, setDays] = useState([]);
  const [pricePerDay2, setPricePerDay2] = useState([]);
  const [days2, setDays2] = useState([]);
  const [pricePerDay3, setPricePerDay3] = useState([]);
  const [days3, setDays3] = useState([]);
  const [value, setValue] = useState("1");

  const location = useLocation();
  const navigate = useNavigate();

  // this value is passed down from portfolio Link to Router
  const coinName = location.state.coinName;
  const coinId = location.state.coinId;
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

  // handles the tab change between the table and the charts
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // handles the back button click
  const handleBackButton = () => {
    navigate("/");
  };

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=30&interval=daily`
      )
      .then((res) => {
        const prices = res.data.prices;
        const pricePerDayArray = [];
        const daysArray = [];
        for (const price of prices) {
          const dayFormat = new Date(price[0]).toISOString();
          const formattedDate = dayFormat.slice(0, 10);
          daysArray.push(formattedDate);
          pricePerDayArray.push(price[1]);
        }
        setDays(daysArray);
        setPricePerDay(pricePerDayArray);
      })
      .catch((err) => console.log(err));
  }, [userId]);

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=90&interval=daily`
      )
      .then((res) => {
        const prices = res.data.prices;
        const pricePerDayArray = [];
        const daysArray = [];
        for (const price of prices) {
          const dayFormat = new Date(price[0]).toISOString();
          const formattedDate = dayFormat.slice(0, 10);
          daysArray.push(formattedDate);
          pricePerDayArray.push(price[1]);
        }
        setDays2(daysArray);
        setPricePerDay2(pricePerDayArray);
      })
      .catch((err) => console.log(err));
  }, [userId]);

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=usd&days=180&interval=daily`
      )
      .then((res) => {
        const prices = res.data.prices;
        const pricePerDayArray = [];
        const daysArray = [];
        for (const price of prices) {
          const dayFormat = new Date(price[0]).toISOString();
          const formattedDate = dayFormat.slice(0, 10);
          daysArray.push(formattedDate);
          pricePerDayArray.push(price[1]);
        }
        setDays3(daysArray);
        setPricePerDay3(pricePerDayArray);
      })
      .catch((err) => console.log(err));
  }, [userId]);

  const state = {
    labels: days,
    datasets: [
      {
        label: "Daily Price",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "#1976d2",
        borderWidth: 1,
        backgroundColor: "#1976d2",
        borderColor: "white",
        data: pricePerDay,
      },
    ],
  };

  const state2 = {
    labels: days2,
    datasets: [
      {
        label: "Daily Price",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "#1976d2",
        borderWidth: 1,
        backgroundColor: "#1976d2",
        borderColor: "white",
        data: pricePerDay2,
      },
    ],
  };

  const state3 = {
    labels: days3,
    datasets: [
      {
        label: "Daily Price",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "#1976d2",
        borderWidth: 1,
        backgroundColor: "#1976d2",
        borderColor: "white",
        data: pricePerDay3,
      },
    ],
  };

  return (
    <div>
      <Navbar />
      <div className="portfolio-container">
        <div className="portfolio-header-container">
          <Button
            onClick={handleBackButton}
            sx={{
              color: "#1976d2",
              backgroundColor: "black",
              border: "1px solid rgba(25, 118, 210, 0.5)",
              "&:hover": {
                border: "1px solid rgba(25, 118, 210, 1)",
                backgroundColor: "black",
              },
              position: "absolute",
              right: 370,
              top: 10,
            }}
          >
            <ArrowBackIcon sx={{ fontSize: 30 }} />
          </Button>
        </div>
        <div className="transaction-coin-info">
          <h1 className="transaction-title">{coinName}</h1>
          <img src={image} alt="crypto" className="coin-image" />
        </div>
      </div>

      <Box sx={{ width: "100%", typography: "body1" }}>
        <TabContext value={value}>
          <Box>
            <Tabs
              value={value}
              onChange={handleChange}
              textColor="primary"
              indicatorColor="primary"
              aria-label="secondary tabs example"
              centered
            >
              <Tab
                label="1 Month (daily)"
                value="1"
                sx={{
                  color: "#5d6870",
                }}
              />
              <Tab
                label="3 Months (daily)"
                value="2"
                sx={{
                  color: "#5d6870",
                }}
              />
              <Tab
                label="6 Months (daily)"
                value="3"
                sx={{
                  color: "#5d6870",
                }}
              />
            </Tabs>
          </Box>
          <TabPanel value="1">
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
                      display: false,
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
                        maxTicksLimit: 20,
                      },
                      grid: {
                        color: "white",
                        lineWidth: 0.2,
                      },
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
                      },
                    },
                  },
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </TabPanel>
          <TabPanel value="2">
            <div className="line-history-chart">
              <Line
                data={state2}
                options={{
                  plugins: {
                    title: {
                      display: false,
                      text: "Total Balance (7 day period)",
                      fontSize: 20,
                    },
                    legend: {
                      display: false,
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
                        maxTicksLimit: 20,
                      },
                      grid: {
                        color: "white",
                        lineWidth: 0.2,
                      },
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
                      },
                    },
                  },
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </TabPanel>
          <TabPanel value="3">
            <div className="line-history-chart">
              <Line
                data={state3}
                options={{
                  plugins: {
                    title: {
                      display: false,
                      text: "Total Balance (7 day period)",
                      fontSize: 20,
                    },
                    legend: {
                      display: false,
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
                        maxTicksLimit: 20,
                      },
                      grid: {
                        color: "white",
                        lineWidth: 0.2,
                      },
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
                      },
                    },
                  },
                  maintainAspectRatio: false,
                }}
              />
            </div>
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  );
};

export default CoinHistory;
