import { React, useState, useEffect } from "react";
import axios from "axios";
import "../../App.css"
import "./portfolio.css"
import { Box, Typography } from "@mui/material";

const TotalProfit = (props) => {

  const [allTransactions, setAllTransactions] = useState([]);
  const { userId, totalBalance } = props;

  // make a get request to get all transactions
  useEffect(() => {
    axios
    .get(`/api/coin/all-transactions?userId=${userId}`)
      .then(res => {
        const allTransaction = res.data.allTransactions;
        console.log(res.data.allTransactions)
        setAllTransactions(allTransaction)
      })
      .catch(err => console.log(err))  
  }, [userId]);

  const allTransactionsArray = [];
  //pushes all BUY transaction values to an array
  for (const transaction of allTransactions) {
    // if (transaction.type === "Buy") {
      allTransactionsArray.push(transaction.total_spent);
    // }
  }

  // calculates the total transaction by adding up all the transactions in an array
  const allTransactionsSum = allTransactionsArray.reduce((pv, cv) => pv + cv, 0);

  console.log(allTransactionsSum)

  // calculate total profit
  const totalProfit = (totalBalance - allTransactionsSum).toFixed(2);

  return (
    (totalProfit >=0 ?
    <Box component="div" className="balance-box profit-box green-box" sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
      <Typography component="h2" variant="h6" className="balance-text" gutterBottom sx={{ textAlign: "center" }}>
        Total Profit/Loss
      </Typography>
      <Typography className="balance-text" sx={{ textAlign: "center", fontWeight: 1000}}>
        ${totalProfit.toLocaleString()}
      </Typography>
    </Box> : 
    <Box component="div" className="balance-box profit-box red-box" sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
      <Typography component="h2" variant="h6" className="balance-text" gutterBottom sx={{ textAlign: "center" }}>
        Total Profit/Loss
      </Typography>
      <Typography className="balance-text" sx={{ textAlign: "center", fontWeight: 1000}}>
        -${(totalProfit * -1).toLocaleString()}
      </Typography>
    </Box>
    )
  );
};

export default TotalProfit;