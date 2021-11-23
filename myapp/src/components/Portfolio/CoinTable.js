import React from "react";
import "../../App.css"
import "./portfolio.css"
import { Typography, Link, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { makeStyles } from "@mui/styles";

// dummy data for now
const rows = [{id: 1, coin: "Bitcoin", price: 100, volume: 20000300, change: 3, market: 120000, holdings: 2, pnl: 3}
]

// this is a makeStyles hook (Custom css)
const useStyles = makeStyles({
  cell: {
    color: "white",
    fontSize: 15,
    padding: "20px 40px"
  }
});

const CoinTable = (props) => {
  // generate the data here
  // some type of axios request first to display data

  const classes = useStyles();

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" className="balance-text" gutterBottom>
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
          {rows.map((row) => (
            <TableRow key={row.id} className="table-row">
              <TableCell className={classes.cell}>{row.coin}</TableCell>
              <TableCell className={classes.cell}>{row.price}</TableCell>
              <TableCell className={classes.cell}>{row.volume}</TableCell>
              <TableCell className={classes.cell}>{row.change}</TableCell>
              <TableCell className={classes.cell}>{row.market}</TableCell>
              <TableCell className={classes.cell}>{row.holdings}</TableCell>
              <TableCell className={classes.cell}>{row.pnl}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
};

export default CoinTable;