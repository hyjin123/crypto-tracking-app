import { React, useEffect, useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import "../../App.css";
import "./portfolio.css";
import TotalBalance from "./TotalBalance";
import PortfolioChange from "./PortfolioChange";
import TotalProfit from "./TotalProfit";
import CoinTable from "./CoinTable";

const Portfolio = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userId, setUserId] = useState(0);

  // retrieve the token from local storage, if empty string, you need to logged in.
  const token = localStorage.getItem("jwtToken");

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

  // calculate the sum here and pass down to total balance
  // can create helper function, update the set holdings in that function (re-factoring)


  return (
    <div>
      <Navbar />
      <div className="portfolio-container">
        <div>
          <h1 className="transaction-title">My Portfolio</h1>
          <p className="transaction-name">{`( ${firstName} ${lastName} )`}</p>
        </div>
        <div className="balance-container">
          <TotalBalance
            firstName={firstName}
            lastName={lastName}
            userId={userId}
            holdings={props.holdings}
          />
          <PortfolioChange
            firstName={firstName}
            lastName={lastName}
            userId={userId}
            holdings={props.holdings}
          />
          <TotalProfit
            firstName={firstName}
            lastName={lastName}
            userId={userId}
            holdings={props.holdings}
          />
        </div>
        <div>
          <CoinTable
            firstName={firstName}
            lastName={lastName}
            userId={userId}
            setHoldings={props.setHoldings}
            holdings={props.holdings}
          />
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
