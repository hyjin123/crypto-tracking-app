import "./App.css";
import Home from "./components/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Portfolio from "./components/Portfolio/index";
import Watchlist from "./components/Watchlist/index";
import Register from "./components/Register";
import Login from "./components/Login";
import { useState } from "react";

function App() {
  const [holdings, setHoldings] = useState([]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/portfolio" element={<Portfolio setHoldings={setHoldings} holdings={holdings} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login helloWorld={"hello world"} />} />
        <Route path="/transactions" element={<Portfolio setHoldings={setHoldings} holdings={holdings} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;