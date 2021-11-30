import React, { useState, useEffect } from "react";
import { Navigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import "../App.css";
import "./Portfolio/portfolio.css"
import Coin from "./Coin";
import Navbar from "./Navbar";
import PopUp from "./PopUp";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
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
    fontSize: 16,
    padding: "20px 20px",
  },
  header: {
    color: "white",
    fontSize: "18px",
    fontWeight: "bold"
  },
  button: {
    padding: "0",
    color: "#b3272e",
  },
  red: {
    color: "#f00606"
  },
  green: {
    color: "#11d811"
  }
});

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [search, setSearch] = useState("");
  // fetches userId from JWT authentication
  const [userId, setUserId] = useState(0);
  // this manages the popup that shows when user clicks on the add to watchlist button
  const [isVisible, setIsVisible] = useState(false);
  // sets state for page numbers
  const [tabNumber, setTabNumber] = useState(0);
  const { page } = useParams();
  // retrieve the token from local storage, if empty string, you need to logged in.
  const token = localStorage.getItem("jwtToken");
  const classes = useStyles();
  // authenticates the user and gets the user's infomation and store them in state
  useEffect(() => {
    axios
      .get("/isUserAuth", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        const user = res.data.user;
        setUserId(user.id);
      })
      .catch((err) => console.log(err));
  }, []);

  // fetches coin data from the coingecko API
  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/exchanges?per_page=10&page=${!page ? 1 : page}`)
      .then((res) => {
        console.log(res.data);
        setExchanges(res.data);
      })
      .catch((error) => console.log(error));
  }, [page]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleTabChange = (e, value) => {
    setTabNumber(value);
  };

  // this sets the timeout on the popup when add to watchlist button is clicked, stretch feature
  // const popUpTimeOut = () => {
  // };
  
  const filteredCoins = exchanges.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
      <div className="table-container">
      <Table size="medium">
        <TableHead>
          <TableRow className="table-row">
            <TableCell className={classes.header}></TableCell>
            <TableCell className={classes.header}>Exchange</TableCell>
            <TableCell className={classes.header}>Trust Score</TableCell>
            <TableCell className={classes.header}>24 hr Volume (Normalized)</TableCell>
            <TableCell className={classes.header}>24 hr Volume</TableCell>
            <TableCell className={classes.header}>Trust Score Rank</TableCell>
            <TableCell className={classes.header }>Year Established</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {exchanges.map((exchange, index) => (
            <TableRow key={index} className="table-row">
              <TableCell className={classes.cell}>
                <img className="table-image" src={exchange.image} alt="exchange" />
              </TableCell>
              <TableCell className={classes.cell}>
                {exchange.name}
              </TableCell>
              <TableCell className={classes.cell}>
              {exchange.trust_score}
              </TableCell>
              <TableCell className={classes.cell}>
              ${exchange.trade_volume_24h_btc_normalized.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
              </TableCell>
              <TableCell className={classes.cell}>
              ${exchange.trade_volume_24h_btc.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
              </TableCell>
              <TableCell className={classes.cell}>
                {exchange.trust_score_rank}
              </TableCell>
              {exchange.year_established === null ?
                <TableCell className={classes.cell}>
                  N/A
                </TableCell> :
                <TableCell className={classes.cell}>
                  {exchange.year_established}            
                </TableCell>
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="coin-pagination">
              <ul>
                <li>
                  <Link to="/" className="coin-page-link">1 </Link>
                </li>
                <li>
                  <Link to="/2" className="coin-page-link">2 </Link>
                </li>
                <li>
                  <Link to="/3" className="coin-page-link">3 </Link>
                </li>
                <li>
                  <Link to="/4" className="coin-page-link">4 </Link>
                </li>
                <li>
                  <Link to="/5" className="coin-page-link">5 </Link>
                </li>
                <li>
                  <Link to="/6" className="coin-page-link">6 </Link>
                </li>
                <li>
                  <Link to="/7" className="coin-page-link">7 </Link>
                </li>
                <li>
                  <Link to="/8" className="coin-page-link">8 </Link>
                </li>
                <li>
                  <Link to="/9" className="coin-page-link">9 </Link>
                </li>
                <li>
                  <Link to="/10" className="coin-page-link">10 </Link>
                </li>
              </ul>
            </div>
    </div>
  )
  }
export default Exchanges;


// country: "Cayman Islands"
// description: ""
// has_trading_incentive: false
// id: "binance"
// image: "https://assets.coingecko.com/markets/images/52/small/binance.jpg?1519353250"
// name: "Binance"
// trade_volume_24h_btc: 447205.45755393204
// trade_volume_24h_btc_normalized: 447205.45755393204
// trust_score: 10
// trust_score_rank: 1
// url: "https://www.binance.com/"
// year_established: 2017
