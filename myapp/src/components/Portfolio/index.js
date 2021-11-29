import { React, useEffect, useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import "../../App.css";
import "./portfolio.css";
import TotalBalance from "./TotalBalance";
import PortfolioChange from "./PortfolioChange";
import TotalProfit from "./TotalProfit";
import CoinTable from "./CoinTable";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import { Tabs } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import DoughnutChart from "./DoughnutChart";
import LineChart from "./LineChart";
import LineChart1 from "./LineChart1";

const Portfolio = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userId, setUserId] = useState(0);
  const [value, setValue] = useState("1");

  const { holdings, profit, setProfit } = props;
  console.log(props.transactions)
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

  // calculate the sum here and pass down to total balance
  // can create helper function, update the set holdings in that function (re-factoring)
  const totalBalanceArray = [];

  //pushes all holdings value for each coin to an array
  for (const holding of holdings) {
    totalBalanceArray.push(holding.holdings * holding.current_price);
  }
  // calculates the total balance by adding up all the holdings value in an array
  const totalBalance = totalBalanceArray.reduce((pv, cv) => pv + cv, 0);

  const total24HoursAgoBalanceArray = [];

  //pushes all holdings value (24 hr ago) for each coin to an array
  for (const holding of holdings) {
    total24HoursAgoBalanceArray.push(
      holding.holdings * (holding.current_price - holding.price_change_24h)
    );
  }

  // calculates the total balance by adding up all the holdings value (24 hr) in an array
  const total24HoursAgoBalance = total24HoursAgoBalanceArray.reduce(
    (pv, cv) => pv + cv,
    0
  );

  return (
    <div>
      <Navbar />
      <div className="portfolio-container">
        <div>
          <h1 className="transaction-title">My Portfolio</h1>
          <p className="transaction-name">{`( ${firstName} ${lastName} )`}</p>
        </div>
        <div className="balance-container">
          <TotalBalance
            firstName={firstName}
            lastName={lastName}
            userId={userId}
            holdings={props.holdings}
            totalBalance={totalBalance}
            total24HoursAgoBalance={total24HoursAgoBalance}
          />
          <PortfolioChange
            firstName={firstName}
            lastName={lastName}
            userId={userId}
            holdings={props.holdings}
            totalBalance={totalBalance}
            total24HoursAgoBalance={total24HoursAgoBalance}
          />
          <TotalProfit
            firstName={firstName}
            lastName={lastName}
            userId={userId}
            holdings={props.holdings}
            totalBalance={totalBalance}
            total24HoursAgoBalance={total24HoursAgoBalance}
          />
        </div>
        <Box sx={{ width: "68%", typography: "body1" }}>
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
                  label="Portfolio"
                  value="1"
                  sx={{
                    color: "#5d6870",
                  }}
                />
                <Tab
                  label="Coin Allocation"
                  value="2"
                  sx={{
                    color: "#5d6870",
                  }}
                />
                <Tab
                  label="Total Balance Worth"
                  value="3"
                  sx={{
                    color: "#5d6870",
                  }}
                />
                {/* <Tab
                  label="Balance History"
                  value="4"
                  sx={{
                    color: "#5d6870",
                  }}
                /> */}
              </Tabs>
            </Box>
            <TabPanel value="1">
              <CoinTable
                firstName={firstName}
                lastName={lastName}
                userId={userId}
                setHoldings={props.setHoldings}
                holdings={props.holdings}
                profit={profit}
                setProfit={setProfit}
              />
            </TabPanel>
            <TabPanel value="2">
              <DoughnutChart holdings={holdings} />
            </TabPanel>
            <TabPanel value="3">
              <LineChart1 holdings={holdings} userId={userId} />
            </TabPanel>
            {/* <TabPanel value="4">
              <LineChart holdings={holdings} userId={userId} />
            </TabPanel> */}
          </TabContext>
        </Box>
      </div>
    </div>
  );
};

export default Portfolio;
