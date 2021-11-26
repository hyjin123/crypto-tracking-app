import React from "react";
import "../../App.css"
import "./portfolio.css"
import { Box, Typography } from "@mui/material";

const PortfolioChange = (props) => {
  const { holdings } = props;

  console.log(holdings);

  const totalBalanceArray = [];

  //pushes all holdings value for each coin to an array
  for (const holding of holdings) {
    totalBalanceArray.push(holding.holdings * holding.current_price);
  }
  // calculates the total balance by adding up all the holdings value in an array
  const totalBalance = totalBalanceArray.reduce((pv, cv) => pv + cv, 0);

  const total24HoursAgoBalanceArray = [];

  //pushes all holdings value for each coin to an array
  for (const holding of holdings) {
    total24HoursAgoBalanceArray.push(holding.holdings * (holding.current_price + holding.price_change_24h));
  }
  // calculates the total balance by adding up all the holdings value in an array
  const total24HoursAgoBalance = total24HoursAgoBalanceArray.reduce((pv, cv) => pv + cv, 0);

  const change = (totalBalance - total24HoursAgoBalance).toFixed(2);

  return (
    <Box component="div" className="balance-box change-box">
      <Typography component="h2" variant="h6" className="balance-text" gutterBottom>
        24h Portfolio Change
      </Typography>
      <Typography className="balance-text">
        ${change.toLocaleString()}
      </Typography>
    </Box>
  );
};

export default PortfolioChange;