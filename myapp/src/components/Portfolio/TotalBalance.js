import React from "react";
import "../../App.css"
import "./portfolio.css"
import { Box, Typography } from "@mui/material";

const TotalBalance = (props) => {
  const { holdings, totalBalance } = props;

  return (
    <Box component="div" className="balance-box" sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
      <Typography component="h2" variant="h6" className="balance-text" gutterBottom sx={{ textAlign: "center" }}>
        Total Balance
      </Typography>
      <Typography className="balance-text"  sx={{ textAlign: "center", fontWeight: 1000, fontSize: 20}}>
        ${totalBalance.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
      </Typography>
    </Box>
  );
};

export default TotalBalance;