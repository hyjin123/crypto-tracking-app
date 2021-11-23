import React from "react";
import "../../App.css"
import "./portfolio.css"
import { Box, Typography } from "@mui/material";

const TotalBalance = (props) => {
  return (
    <Box component="div" className="balance-box">
      <Typography component="h2" variant="h6" className="balance-text" gutterBottom>
        Total Balance
      </Typography>
      <Typography className="balance-text">
        $0.00
      </Typography>
    </Box>
  );
};

export default TotalBalance;