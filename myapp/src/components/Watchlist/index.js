import { React, useEffect, useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import "../../App.css";
import "../Portfolio/portfolio.css";
import CoinTable from "./CoinTable";

const Watchlist = (props) => {
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

  return (
    <div>
      <Navbar />
      <div className="portfolio-container">
        <div>
          <h1 className="transaction-title">My Watchlist</h1>
          <p className="transaction-name">{`( ${firstName} ${lastName} )`}</p>
        </div>
        <div className="balance-container">
          <div>
            <CoinTable
              firstName={firstName}
              lastName={lastName}
              userId={userId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watchlist;

