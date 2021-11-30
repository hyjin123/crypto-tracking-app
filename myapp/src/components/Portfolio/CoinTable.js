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
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import AddNewCoin from "./AddNewCoin";

// this is a makeStyles hook (Custom css)
const useStyles = makeStyles({
  cell: {
    color: "white",
    fontSize: 16,
    padding: "10px 20px",
  },
  header: {
    color: "white",
    fontSize: "18px",
    fontWeight: "bold"
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
  const [profits, setProfits] = useState({});

  const {
    firstName,
    lastName,
    userId,
    setHoldings,
    holdings,
    profit,
    setProfit,
  } = props;
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
        setAddCoins(addedCoinId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const callBack = (coinName, coinCurrentPrice) => {
    return axios
      .get(`/api/coin/transaction?userId=${userId}&coinName=${coinName}`)
      .then((res) => {
        // do the profit loss calculation with the transactions for each coin
        const allTransactions = res.data.allTransactions;
        let totalQuantityArrayBuy = [];
        let totalSpentArrayBuy = [];
        let totalQuantityArraySell = [];
        let totalSpentArraySell = [];
        if (allTransactions) {
          for (const transaction of allTransactions) {
            if (transaction.type === "Buy") {
              totalQuantityArrayBuy.push(transaction.quantity);
              totalSpentArrayBuy.push(transaction.total_spent);
            } else {
              totalQuantityArraySell.push(transaction.quantity);
              totalSpentArraySell.push(-1 * transaction.total_spent);
            }
          }
        }
        // calculates the total quantity
        const totalQuantityBuy = totalQuantityArrayBuy.reduce(
          (pv, cv) => pv + cv,
          0
        );
        const totalQuantitySell = totalQuantityArraySell.reduce(
          (pv, cv) => pv + cv,
          0
        );

        // calculates the total amount
        const totalSpentBuy = totalSpentArrayBuy.reduce((pv, cv) => pv + cv, 0);
        const totalSpentSell = totalSpentArraySell.reduce(
          (pv, cv) => pv + cv,
          0
        );

        const profitLoss = coinCurrentPrice * totalQuantityBuy - totalSpentBuy;
        const profitLoss2 =
          totalSpentSell - coinCurrentPrice * totalQuantitySell;
        const totalProfit = profitLoss + profitLoss2;
        // insert all the profits into an object
        setProfits((prev) => ({
          ...prev,
          [coinName]: totalProfit,
        }));
      });
  };

  const profitLossCalculation = () => {
    // back a backend request to get ALL transactions for each of the holding coins (loop) (all of it, even 0 holdings because there still could be profit/loss
    let profitArray = [];
    if (holdings.length > 0) {
      for (const holding of holdings) {
        const coinName = holding.name;
        const coinCurrentPrice = holding.current_price;
        callBack(coinName, coinCurrentPrice)
          .then((data) => console.log(data))
          .catch((err) => console.log(err));
      }
    }
  };

  //run this function just once.
  useEffect(() => {
    profitLossCalculation();
  }, [holdings]);

  const copyHoldingsState = [...holdings];
  console.log(copyHoldingsState);
  console.log(profits);

  const copyProfitsState = {...profits};

  for (let i = 0; i < copyHoldingsState.length; i++) {
    for (const profit in copyProfitsState) {
      if (copyHoldingsState[i].name === profit) {
        copyHoldingsState[i].profits = copyProfitsState[profit];
      }
    }
  }

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
            <TableCell className={classes.header}></TableCell>
            <TableCell className={classes.header}>Coin</TableCell>
            <TableCell className={classes.header}>Price</TableCell>
            <TableCell className={classes.header}>24 hr High</TableCell>
            <TableCell className={classes.header}>24 hr Low</TableCell>
            <TableCell className={classes.header}>24 Hour (%)</TableCell>
            <TableCell className={classes.header}>Market Cap</TableCell>
            <TableCell className={classes.header}>Holdings</TableCell>
            <TableCell className={classes.header}>Holdings Value</TableCell>
            <TableCell className={classes.header}>PNL</TableCell>
            <TableCell className={classes.header}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(Object.keys(copyHoldingsState).length > 0 && holdings.length > 0) && copyHoldingsState.map((coin, index) => (
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
              {coin.profits === 0 && <TableCell className={classes.cell}>${coin.profits}</TableCell>}
              {coin.profits > 0 && <TableCell className={classes.cell, classes.green}>${coin.profits.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>}
              {coin.profits < 0 && <TableCell className={classes.cell, classes.red}>-${-(coin.profits).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</TableCell>}
              <TableCell className={classes.button}>
                <Button
                  component={Link}
                  to={{ pathname: "/transaction" }}
                  state={{
                    coinName: coin.name,
                    portfolioCoinId: coin.portfolioCoinId,
                    currentHoldings: coin.holdings,
                  }}
                  sx={{ color: "white" }}
                >
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

// const profitLossCalculation = () => {
//   // back a backend request to get ALL transactions for each of the holding coins (loop) (all of it, even 0 holdings because there still could be profit/loss
//   let profitArray = [];
//   if(holdings.length > 0) {
//     for (const holding of holdings) {
//       const coinName = holding.name;
//       const coinCurrentPrice = holding.current_price;
//       axios.get(`/api/coin/transaction?userId=${userId}&coinName=${coinName}`)
//         .then(res => {
//           // do the profit loss calculation with the transactions for each coin
//           const allTransactions = res.data.allTransactions;
//           let totalQuantityArrayBuy = [];
//           let totalSpentArrayBuy = [];
//           let totalQuantityArraySell = [];
//           let totalSpentArraySell = [];
//           if (allTransactions) {
//             for (const transaction of allTransactions) {
//               if (transaction.type === "Buy") {
//                 totalQuantityArrayBuy.push(transaction.quantity);
//                 totalSpentArrayBuy.push(transaction.total_spent)
//               } else {
//                 totalQuantityArraySell.push(transaction.quantity);
//                 totalSpentArraySell.push(-1 * (transaction.total_spent))
//               }
//             }
//           }
//           // calculates the total quantity
//           const totalQuantityBuy = totalQuantityArrayBuy.reduce((pv, cv) => pv + cv, 0);
//           const totalQuantitySell = totalQuantityArraySell.reduce((pv, cv) => pv + cv, 0);

//           // calculates the total amount
//           const totalSpentBuy = totalSpentArrayBuy.reduce((pv, cv) => pv + cv, 0);
//           const totalSpentSell = totalSpentArraySell.reduce((pv, cv) => pv + cv, 0);

//           const profitLoss = (coinCurrentPrice * totalQuantityBuy) - totalSpentBuy;
//           const profitLoss2 = totalSpentSell - (coinCurrentPrice * totalQuantitySell);
//           const totalProfit = profitLoss + profitLoss2

//           // insert all the profits into an object
//           profitArray.push({ [coinName]: totalProfit })
//         })
//         .catch(err => console.log(err))
//     }
//     console.log(profitArray)
//     return profitArray;
//   }
// };
