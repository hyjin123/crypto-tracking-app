import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../App.css";
import "../Portfolio/portfolio.css";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import AddIcon from "@mui/icons-material/Add";

// this is a makeStyles hook (Custom css)
const useStyles = makeStyles({
  cell: {
    color: "white",
    fontSize: 15,
    padding: "10px 20px",
  },
  button: {
    padding: "0",
  },
  red: {
    color: "#f00606",
  },
  green: {
    color: "#11d811",
  },
});

const TransactionTable = (props) => {
  const [addCoins, setAddCoins] = useState(0);
  const { firstName, lastName, userId, setHoldings, holdings } = props;
  const classes = useStyles();

  // this promise makes a request to internal API to get holdings information and third party API to get real time data for those holdings
  // useEffect(() => {
  //   Promise.all([
  //     axios.get(`/api/portfolio/coin?userId=${userId}`, {}),
  //     axios.get(
  //       "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
  //     ),
  //   ]).then((all) => {
  //     const holdings = all[0].data.holdings;
  //     const resultsArray = [];
  //     const data = all[1].data;
  //     for (let i = 0; i < holdings?.length; i++) {
  //       for (let j = 0; j < data?.length; j++) {
  //         if (holdings[i].name == data[j].name) {
  //           const dataMatch = data[j];
  //           const holdingMatch = holdings[i].holdings;
  //           // add the holdings property into the coin data object
  //           dataMatch.holdings = holdingMatch;
  //           resultsArray.push(dataMatch);
  //         }
  //       }
  //     }
  //     setHoldings(resultsArray);
  //   });
  // }, [userId, addCoins]);

  // handles when user clicks add coin in the pop up
  // const handleAddCoin = (coinName, userId) => {
  //   // add the new coin to the database by making a post request to the backend
  //   axios
  //     .post("/api/portfolio/coin", {
  //       coinName: coinName,
  //       userId: userId,
  //     })
  //     .then((res) => {
  //       const addedCoinId = res.data.coinId;
  //       setAddCoins(addedCoinId);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };
  // console.log(addCoins);

  return (
    <div className="table-container">
      <Table size="medium">
        <TableHead>
          <TableRow className="table-row">
            <TableCell className={classes.cell}></TableCell>
            <TableCell className={classes.cell}>Coin</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {holdings.map((coin, index) => (
            <TableRow key={index} className="table-row">
              <TableCell className={classes.cell}>
                <img className="table-image" src={coin.image} alt="crypto" />
              </TableCell>
              <TableCell className={classes.cell}>{coin.name}</TableCell>
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionTable;
