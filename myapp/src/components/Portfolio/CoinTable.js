import { React, useEffect, useState } from "react";
import "../../App.css";
import "./portfolio.css";
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";

// this is a makeStyles hook (Custom css)
const useStyles = makeStyles({
  cell: {
    color: "white",
    fontSize: 15,
    padding: "20px 40px",
  },
});

const CoinTable = (props) => {
  const [holdings, setHoldings] = useState([]);
  const { firstName, lastName, userId } = props;
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
            // add the holdings property into the coin data object
            dataMatch.holdings = holdingMatch;
            resultsArray.push(dataMatch);
          }
        }
      }
      setHoldings(resultsArray);
    });
  }, [userId]);

  return (
    <>
      <Typography
        component="h2"
        variant="h6"
        className="balance-text"
        gutterBottom
      >
        Holdings
      </Typography>
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
            <TableCell className={classes.cell}>PNL</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {holdings.map((coin, index) => (
            <TableRow key={index} className="table-row">
              <TableCell className={classes.cell}>
                <img className="table-image" src={coin.image} alt='crypto' />
              </TableCell>
              <TableCell className={classes.cell}>{coin.name}</TableCell>
              <TableCell className={classes.cell}>{coin.current_price}</TableCell>
              <TableCell className={classes.cell}>{coin.high_24h}</TableCell>
              <TableCell className={classes.cell}>{coin.low_24h}</TableCell>
              <TableCell className={classes.cell}>{coin.price_change_percentage_24h}</TableCell>
              <TableCell className={classes.cell}>{coin.market_cap}</TableCell>
              <TableCell className={classes.cell}>{coin.holdings}</TableCell>
              <TableCell className={classes.cell}>{coin.pnl}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default CoinTable;
