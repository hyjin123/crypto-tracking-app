import React from "react";
import "../../App.css"
import "./portfolio.css"
import { Box, Typography } from "@mui/material";

const TotalBalance = (props) => {
  const { holdings } = props;

  const totalBalanceArray = [];

  //pushes all holdings value for each coin to an array
  for (const holding of holdings) {
    totalBalanceArray.push(holding.holdings * holding.current_price);
  }
  // calculates the total balance by adding up all the holdings value in an array
  const totalBalance = totalBalanceArray.reduce((pv, cv) => pv + cv, 0);

  return (
    <Box component="div" className="balance-box">
      <Typography component="h2" variant="h6" className="balance-text" gutterBottom>
        Total Balance
      </Typography>
      <Typography className="balance-text">
        ${totalBalance.toLocaleString()}
      </Typography>
    </Box>
  );
};

export default TotalBalance;