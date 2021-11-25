import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../../App.css";
import TransactionPopUp from "./TransactionPopUp";
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
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

// this is a makeStyles hook (Custom css)
const useStyles = makeStyles({
  cell: {
    color: "white",
    fontSize: 15,
    padding: "10px 20px",
  },
  button: {
    padding: "0",
    color: "#b3272e",
  },
  red: {
    color: "#f00606",
  },
  green: {
    color: "#11d811",
  },
});

const TransactionTable = (props) => {
  const [transactions, setTransactions] = useState([]);
  const [addTraction, setAddTransaction] = useState(0);
  const { firstName, lastName, userId, setHoldings, holdings, coinName } = props;
  const classes = useStyles();

  // get transaction data from internal api
  // get real time data from third party api or use the holdings data passed down as props? choose one...wisely
  // get real time data and setHoldings!!!! to get real time data, better for users
  // display the transaction data in the table
  // display the balance data at the top

  // this promise makes a request to internal API to get transaction information and third party API to get real time data for those transactions
  useEffect(() => {
    Promise.all([
      axios.get(`/api/coin/transaction?userId=${userId}&coinName=${coinName}`, {}),
      axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      ),
    ]).then((all) => {
      const allTransactions = all[0].data.allTransactions;
      console.log(allTransactions)
      setTransactions(allTransactions)
    });
  }, [userId]);

  return (
    <div className="table-container">
      <div className="transaction-popup">
        <TransactionPopUp />
      </div>
      <Table size="medium">
        <TableHead>
          <TableRow className="table-row">
            <TableCell className={classes.cell}>Type</TableCell>
            <TableCell className={classes.cell}>Price</TableCell>
            <TableCell className={classes.cell}>Quantity</TableCell>
            <TableCell className={classes.cell}>Date</TableCell>
            <TableCell className={classes.cell}>Fees</TableCell>
            <TableCell className={classes.cell}>Cost</TableCell>
            <TableCell className={classes.cell}>PNL</TableCell>
            <TableCell className={classes.cell}>Notes</TableCell>
            <TableCell className={classes.cell}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((transaction, index) => (
            <TableRow key={index} className="table-row">
              <TableCell className={classes.cell}>{transaction.type}</TableCell>
              <TableCell className={classes.cell}>${transaction.price_per_coin}</TableCell>
              <TableCell className={classes.cell}>{transaction.quantity}</TableCell>
              <TableCell className={classes.cell}>{transaction.date.substring(0, 10)}</TableCell>
              <TableCell className={classes.cell}>${transaction.fee}</TableCell>
              <TableCell className={classes.cell}>${transaction.total_spent}</TableCell>
              <TableCell className={classes.cell}>PNL</TableCell>
              <TableCell className={classes.cell}>{transaction.note}</TableCell>
              <TableCell className={classes.cell}>
                <Button className={classes.button}>
                  <DeleteForeverIcon />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TransactionTable;
