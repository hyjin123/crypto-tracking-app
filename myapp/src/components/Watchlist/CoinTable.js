import { React, useEffect, useState } from "react";
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
});

const CoinTable = (props) => {
  const [watchlistCoins, setWatchlistCoins] = useState([]);
  const [deletedCoin, setDeletedCoin] = useState({});

  const { firstName, lastName, userId } = props;
  const classes = useStyles();

  // this promise makes a request to internal API to get watchlist information and third party API to get real time data for those watchlist coins
  useEffect(() => {
    Promise.all([
      axios.get(`/api/watchlist/coin?userId=${userId}`, {}),
      axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      ),
    ]).then((all) => {
      const watchlist = all[0].data.watchlistCoins;
      const resultsArray = [];
      const data = all[1].data;
      for (let i = 0; i < watchlist?.length; i++) {
        for (let j = 0; j < data?.length; j++) {
          if (watchlist[i].name == data[j].name) {
            const dataMatch = data[j];
            resultsArray.push(dataMatch);
          }
        }
      }
      setWatchlistCoins(resultsArray);
    });
  }, [userId, deletedCoin]);

  // handles when user clicks the Delete button, it removes it from the watchlist (database)
  const handleDeleteWatchlist = (coinName, userId) => {
    axios
      .put("/api/watchlist/coin", {
          coinName: coinName,
          userId: userId
      })
      .then((res) => {
        setDeletedCoin(res);
      })  
      .catch((err) => console.log(err));
  };

  return (
    <div className="table-container">
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
            <TableCell className={classes.cell}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {watchlistCoins.map((coin, index) => (
            <TableRow key={index} className="table-row">
              <TableCell className={classes.cell}>
                <img className="table-image" src={coin.image} alt="crypto" />
              </TableCell>
              <TableCell className={classes.cell}>{coin.name}</TableCell>
              <TableCell className={classes.cell}>
                {coin.current_price}
              </TableCell>
              <TableCell className={classes.cell}>{coin.high_24h}</TableCell>
              <TableCell className={classes.cell}>{coin.low_24h}</TableCell>
              <TableCell className={classes.cell}>
                {coin.price_change_percentage_24h}
              </TableCell>
              <TableCell className={classes.cell}>{coin.market_cap}</TableCell>
              <TableCell className={classes.cell}>
                <Button className={classes.button} onClick={() => handleDeleteWatchlist(coin.name, userId)}>
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

export default CoinTable;
