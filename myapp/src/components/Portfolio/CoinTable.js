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

// dummy data for now
// const holdings = [
//   {
//     id: 1,
//     coin: "Bitcoin",
//     price: 100,
//     volume: 20000300,
//     change: 3,
//     market: 120000,
//     holdings: 2,
//     pnl: 3,
//   },
// ];

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

  useEffect(() => {
    if (userId !== 0) {
      axios
        .get(`/api/portfolio/coin?userId=${userId}`, {}) //whenever you make a get request, you send the body/data as query string
        .then((res) => {
          setHoldings(res.data.holdings);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userId]);
  console.log(holdings)
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
            <TableCell className={classes.cell}>Coin</TableCell>
            <TableCell className={classes.cell}>Price</TableCell>
            <TableCell className={classes.cell}>Total Volume</TableCell>
            <TableCell className={classes.cell}>24 Hour</TableCell>
            <TableCell className={classes.cell}>Market Cap</TableCell>
            <TableCell className={classes.cell}>Holdings</TableCell>
            <TableCell className={classes.cell}>PNL</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {holdings.map((coin) => (
            <TableRow key={coin.coin_id} className="table-row">
              <TableCell className={classes.cell}>{coin.name}</TableCell>
              <TableCell className={classes.cell}>{coin.price}</TableCell>
              <TableCell className={classes.cell}>{coin.volume}</TableCell>
              <TableCell className={classes.cell}>{coin.change}</TableCell>
              <TableCell className={classes.cell}>{coin.market}</TableCell>
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
