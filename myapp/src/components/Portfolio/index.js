import React from "react";
import Navbar from "../Navbar";
import "../../App.css"
import "./portfolio.css"
import TotalBalance from "./TotalBalance"
import PortfolioChange from "./PortfolioChange";
import TotalProfit from "./TotalProfit";
import AddNewCoin from "./AddNewCoin";
import CoinTable from "./CoinTable";

const Portfolio = (props) => { 
  return (
    <div>
      <Navbar />
      <div className="portfolio-container">
        <div>
          <h1>My Portfolio</h1>
        </div>
        <div className="balance-container">
          <TotalBalance />
          <PortfolioChange />
          <TotalProfit />
        </div>
        <div>
          <AddNewCoin />
        </div>
        <div>
          <CoinTable />
        </div>
      </div>
    </div>
  );
};

export default Portfolio;