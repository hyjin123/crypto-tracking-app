import { React, useEffect, useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import "../../App.css";
import "../Portfolio/portfolio.css";
import TransactionTable from "./TransactionTable";
import { useLocation, Link, useNavigate } from "react-router";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from "@mui/material";

const Transaction = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userId, setUserId] = useState(0);
  const [coin, setCoin] = useState([]);
  const [open, setOpen] = useState(false);
  const [addedTransaction, setAddedTransaction] = useState({});

  const { holdings, setHoldings, transactions, profit, setProfit } = props;

  const location = useLocation();
  const navigate = useNavigate();

  // this value is passed down from portfolio Link to Router
  const coinName = location.state.coinName;
  const portfolioCoinId = location.state.portfolioCoinId;
  const currentHoldings = location.state.currentHoldings;

  // get the updated value of total holdings
  let totalHoldingsArray = [];
  for (const transaction of transactions) {
    if(transaction.type === "Buy") {
      totalHoldingsArray.push(transaction.quantity)
    } else {
      totalHoldingsArray.push(-(transaction.quantity))
    }
  }
  const totalHoldings = totalHoldingsArray.reduce((pv, cv) => pv + cv, 0);

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

  // fetch current coin price from the coin state (fetched from coingecko api)
  let currentCoinPrice = 0;
  if(coin.length > 0) {
    currentCoinPrice = coin[0].current_price;
  }

  // fetch the total cost of all transactions and subtract current price * quantity to get profit/loss
  let totalQuantityArrayBuy = [];
  let totalSpentArrayBuy = [];
  let totalQuantityArraySell = [];
  let totalSpentArraySell = [];

  for (const transaction of transactions) {
    if (transaction.type === "Buy") {
      totalQuantityArrayBuy.push(transaction.quantity);
      totalSpentArrayBuy.push(transaction.total_spent)
    } else {
      totalQuantityArraySell.push(transaction.quantity);
      totalSpentArraySell.push(-1 * (transaction.total_spent))
    }
  }

  // calculates the total quantity
  const totalQuantityBuy = totalQuantityArrayBuy.reduce((pv, cv) => pv + cv, 0);
  const totalQuantitySell = totalQuantityArraySell.reduce((pv, cv) => pv + cv, 0);

  // calculates the total amount
  const totalSpentBuy = totalSpentArrayBuy.reduce((pv, cv) => pv + cv, 0);
  const totalSpentSell = totalSpentArraySell.reduce((pv, cv) => pv + cv, 0);

  const profitLoss = (currentCoinPrice * totalQuantityBuy) - totalSpentBuy;
  const profitLoss2 = totalSpentSell - (currentCoinPrice * totalQuantitySell); 
  const totalProfit = profitLoss + profitLoss2

  return (
    <div>
      <Navbar />
      <div className="portfolio-container">
        <div className="portfolio-header-container">
          <Button onClick={handleBackButton} 
          sx={{
            color: "#1976d2",
            backgroundColor: "black",
            border: "1px solid rgba(25, 118, 210, 0.5)",
              '&:hover': {
              border: "1px solid rgba(25, 118, 210, 1)",
              backgroundColor: "black"
            },
            position: "absolute",
            right: 370,
            top: 10
          }}>
            <ArrowBackIcon sx={{ fontSize: 30 }}/>
          </Button>
        </div>
        <div className="transaction-coin-info">
          <h1 className="transaction-title">My Transactions</h1>
          <p className="transaction-name">{`( ${firstName} ${lastName} )`}</p>
          {/* this fixes the rendering issue with the image as coin state is originally set to empty array */}
          {coin.length > 0 && <img src={coin[0].image} alt="crypto" className="coin-image"/> }
          <p>{coinName}</p>
        </div>
        <div className="coin-information">
          <div className="holdings-info">Current Price: 
            <div className="bright">
              ${currentCoinPrice.toLocaleString()}
            </div>
          </div>
          <div className="holdings-info">Holdings Value:
            <div className="bright">
              ${(currentCoinPrice * totalHoldings).toLocaleString()}
            </div>
          </div>
          <div className="holdings-info">Holdings:
            <div className="bright">
              {totalHoldings} 
            </div>
            </div>
          <div className="holdings-info"> Average Net Cost:</div>
          <div className="holdings-info"> Total Profit/Loss:
          {totalProfit >= 0 ? 
            <div className="bright green">
              ${totalProfit.toLocaleString()} 
            </div> :
            <div className="bright red">
              -${(-1 * totalProfit).toLocaleString()} 
            </div>
          }
          </div>
          <div></div>
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
              transactions={props.transactions}
              setTransactions={props.setTransactions}
              currentCoinPrice={currentCoinPrice}
              addedTransaction={addedTransaction}
              setAddedTransaction={setAddedTransaction}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
