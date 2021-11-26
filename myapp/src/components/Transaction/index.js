import { React, useEffect, useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import "../../App.css";
import "../Portfolio/portfolio.css";
import TransactionTable from "./TransactionTable";
import { useLocation, Link, useNavigate } from "react-router";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { makeStyles } from "@mui/styles";

// this is a makeStyles hook (Custom css)
const useStyles = makeStyles({
  button: {
    color: "#1976d2",
    backgroundColor: "black",
    border: "1px solid rgba(25, 118, 210, 0.5)",
    '&:hover': {
      border: "1px solid rgba(25, 118, 210, 1)",
      backgroundColor: "black"
   },
  },
});

const Transaction = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userId, setUserId] = useState(0);
  const [coin, setCoin] = useState([]);
  const [open, setOpen] = useState(false);

  const { holdings, setHoldings } = props;

  const location = useLocation();
  const navigate = useNavigate();
  // const classes = useStyles();

  // this value is passed down from portfolio Link to Router
  const coinName = location.state.coinName;
  const portfolioCoinId = location.state.portfolioCoinId;

  // retrieve the token from local storage, if empty string, you need to logged in.
  const token = localStorage.getItem("jwtToken");

  // handles the back button click
  const handleBackButton = () => {
    navigate('/portfolio');
  };

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
        setFirstName(user.first_name);
        setLastName(user.last_name);
        setUserId(user.id);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

   // fetches coin data from the coingecko API, can use this to use image for UI :p
   useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        const resultArray = [];
        for (const coin of res.data) {
          if (coin.name === coinName) {
            resultArray.push(coin);
          }
        }
        setCoin(resultArray);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div>
      <Navbar />
      <div className="portfolio-container">
        <button className="back-button" onClick={handleBackButton}>
          <ArrowBackIcon sx={{ fontSize: 30 }}/>
        </button>
        <div>
          <h1>My Transactions for {coinName}</h1>
          <h3>{`( ${firstName} ${lastName} )`}</h3>
          {/* this fixes the rendering issue with the image as coin state is originally set to empty array */}
          {coin.length > 0 && <img src={coin[0].image} alt="crypto" className="coin-image"/> }
        </div>
        <div className="balance-container">
          <div>
            <TransactionTable
              firstName={firstName}
              lastName={lastName}
              userId={userId}
              holdings={holdings}
              setHoldings={setHoldings}
              coinName={coinName}
              portfolioCoinId={portfolioCoinId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
