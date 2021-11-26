import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../App.css";
import "./portfolio.css";
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
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import AddNewCoin from "./AddNewCoin";

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

const CoinTable = (props) => {
  const [addCoins, setAddCoins] = useState(0);
  const { firstName, lastName, userId, setHoldings, holdings } = props;
  const classes = useStyles();

  // this promise makes a request to internal API to get holdings information and third party API to get real time data for those holdings
  useEffect(() => {
    Promise.all([
      axios.get(`/api/portfolio/coin?userId=${userId}`, {}),
      axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      ),
    ]).then((all) => {
      const holdings = all[0].data.holdings;
      const resultsArray = [];
      const data = all[1].data;
      for (let i = 0; i < holdings?.length; i++) {
        for (let j = 0; j < data?.length; j++) {
          if (holdings[i].name == data[j].name) {
            const dataMatch = data[j];
            const holdingMatch = holdings[i].holdings;
            const portfolioIdMatch = holdings[i].id;
            // add the holdings property into the coin data object
            dataMatch.holdings = holdingMatch;
            dataMatch.portfolioCoinId = portfolioIdMatch;
            resultsArray.push(dataMatch);
          }
        }
      }
      setHoldings(resultsArray);
    });
  }, [userId, addCoins]);

  // handles when user clicks add coin in the pop up
  const handleAddCoin = (coinName, userId) => {
    // add the new coin to the database by making a post request to the backend
    axios
      .post("/api/portfolio/coin", {
        coinName: coinName,
        userId: userId,
      })
      .then((res) => {
        const addedCoinId = res.data.coinId;
        setAddCoins(addedCoinId)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="table-container">
      <div className="table-button">
        <AddNewCoin
          firstName={firstName}
          lastName={lastName}
          userId={userId}
          handleAddCoin={handleAddCoin}
          holdings={holdings}
        />
      </div>
      <Table size="medium">
        <TableHead>
          <TableRow className="table-row">
            <TableCell className={classes.cell}></TableCell>
            <TableCell className={classes.cell}>Coin</TableCell>
            <TableCell className={classes.cell}>Price</TableCell>
            <TableCell className={classes.cell}>24 hr High</TableCell>
            <TableCell className={classes.cell}>24 hr Low</TableCell>
            <TableCell className={classes.cell}>24 Hour (%)</TableCell>
            <TableCell className={classes.cell}>Market Cap</TableCell>
            <TableCell className={classes.cell}>Holdings</TableCell>
            <TableCell className={classes.cell}>Holdings Value</TableCell>
            <TableCell className={classes.cell}>PNL</TableCell>
            <TableCell className={classes.cell}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {holdings.map((coin, index) => (
            <TableRow key={index} className="table-row">
              <TableCell className={classes.cell}>
                <img className="table-image" src={coin.image} alt="crypto" />
              </TableCell>
              <TableCell className={classes.cell}>{coin.name}</TableCell>
              <TableCell className={classes.cell}>
                ${coin.current_price.toLocaleString()}
              </TableCell>
              <TableCell className={classes.cell}>
                ${coin.high_24h.toLocaleString()}
              </TableCell>
              <TableCell className={classes.cell}>
                ${coin.low_24h.toLocaleString()}
              </TableCell>
              {coin.price_change_percentage_24h < 0 ? (
                <TableCell className={(classes.cell, classes.red)}>
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </TableCell>
              ) : (
                <TableCell className={(classes.cell, classes.green)}>
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </TableCell>
              )}

              <TableCell className={classes.cell}>
                ${coin.market_cap.toLocaleString()}
              </TableCell>
              <TableCell className={classes.cell}>{coin.holdings}</TableCell>
              <TableCell className={classes.cell}>
                ${(coin.holdings * coin.current_price).toLocaleString()}
              </TableCell>
              <TableCell className={classes.cell}>{coin.pnl}</TableCell>
              <TableCell className={classes.button}>
                <Button component={Link} to={{pathname: "/transaction"}} state={{ coinName: coin.name, portfolioCoinId: coin.portfolioCoinId }} sx={{ color: "white" }}>
                    <KeyboardArrowRightIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CoinTable;
