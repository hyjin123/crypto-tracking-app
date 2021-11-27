import { React } from "react";
import "./Coin.css";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { flexbox } from "@mui/system";

// historical data for a specific coin based on coin_id which is the coin name
// this api is for 3 month historical data at weekly interval
// https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=90&interval=weekly

// this is a makeStyles hook (Custom css)
const useStyles = makeStyles({
  cell: {
    color: "white",
    fontSize: 15,
    padding: "10px 20px",
  },
  button: {
    display: flexbox,
    flexDirection: "column",
    alignItems: "center",
    fontSize: 10,
    padding: "0",
    color: "white",
  },
});

const Coin = ({
  name,
  userId,
  price,
  symbol,
  marketcap,
  volume,
  image,
  priceChange,
  setIsVisible
}) => {
  // this is used to pop up a component whenver someone adds a coin to a watchlist
  const classes = useStyles();

  // handles when user clicks Add to Watchlist
  const handleAddToWatchlist = (coinName, userId) => {
    // add the new coin to the database by making a post request to the backend
    axios
      .post("/api/watchlist/coin", {
        coinName: coinName,
        userId: userId,
      })
      .then((res) => {
        setIsVisible(true);
      })
      .catch((err) => console.log(err));
  };

  // console.log(isVisible)
  return (
    <div className="coin-container">

      <div className="coin-row">
        <div className="coin">
          <img src={image} alt="crypto" />
          <h1>{name}</h1>
          <p className="coin-symbol">{symbol}</p>
        </div>
        <div className="coin-data">
          <p className="coin-price">${price}</p>
          <p className="coin-volume">{volume.toLocaleString()}</p>

          {priceChange < 0 ? (
            <p className="coin-percent red">{priceChange.toFixed(2)}%</p>
          ) : (
            <p className="coin-percent green">{priceChange.toFixed(2)}%</p>
          )}

          <p className="coin-marketcap">
            ${marketcap.toLocaleString()}
          </p>
        </div>
      </div>
      <div className="coin-button">
          <Button
            className={classes.button}
            onClick={() => handleAddToWatchlist(name, userId)}
          >
            <AddIcon />
            <p className="coin-watchlist">Add to Watchlist</p>
          </Button>
        </div>
    </div>
  );
};

export default Coin;
