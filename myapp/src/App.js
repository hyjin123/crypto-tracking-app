import "./App.css";
import Home from "./components/Home";
import { React, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Portfolio from "./components/Portfolio/index";
import Watchlist from "./components/Watchlist/index";
import Register from "./components/Register";
import Login from "./components/Login";
import Transaction from "./components/Transaction/index"
import CoinHistory from "./components/CoinHistory/CoinHistory";

function App() {

  // holdings available to all children
  const [holdings, setHoldings] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [profit, setProfit] = useState(0);

  console.log(transactions);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:page" element={<Home />} />
        <Route path="/coin-history" element={<CoinHistory />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/portfolio" element={<Portfolio setHoldings={setHoldings} holdings={holdings} setTransactions={setTransactions} transactions={transactions} profit={profit} setProfit={setProfit} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/transaction" element={<Transaction setHoldings={setHoldings} holdings={holdings} setTransactions={setTransactions} transactions={transactions} profit={profit} setProfit={setProfit} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;