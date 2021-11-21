import React from "react";
import Navbar from "./Navbar";
import "../App.css"

const Watchlist = (props) => {
  return (
    <div>
      <Navbar />
      <h1 className="fixed">This is the Watchlist</h1>
    </div>
  );
}

export default Watchlist;