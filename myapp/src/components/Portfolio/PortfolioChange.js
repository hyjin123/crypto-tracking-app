import React from "react";
import "../../App.css"
import "./portfolio.css"
import { Box, Typography } from "@mui/material";

const PortfolioChange = (props) => {
  const { holdings, totalBalance, total24HoursAgoBalance } = props;

  const change = (totalBalance - total24HoursAgoBalance).toFixed(2);

  return (
    (change >= 0 ? 
    <Box component="div" className="balance-box change-box green-box" sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
      <Typography component="h2" variant="h6" className="balance-text" gutterBottom sx={{ textAlign: "center" }}>
        24h Change
      </Typography>
          <Typography className="balance-text" sx={{ textAlign: "center", fontWeight: 1000, fontSize: 20}}>
            ${change.toLocaleString()}
          </Typography>
    </Box>
     : 
    <Box component="div" className="balance-box change-box red-box" sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
      <Typography component="h2" variant="h6" className="balance-text" gutterBottom sx={{ textAlign: "center" }}>
        24h Change
      </Typography>
      <Typography className="balance-text" sx={{ textAlign: "center", fontWeight: 1000, fontSize: 20}}>
        -${(change * -1).toLocaleString()}
      </Typography>
    </Box>
    )
  )
};

export default PortfolioChange;