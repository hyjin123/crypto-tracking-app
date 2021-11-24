import { React, useState, useEffect } from "react";
import "../App.css";
import "./Portfolio/portfolio.css";
import CloseIcon from '@mui/icons-material/Close';

const PopUp = (props) => {

  return props.trigger ? (
    <div className="popup">
      <h2>Added to Watchlist!</h2>
      <button onClick={() => props.setTrigger(false)} className="watchlist-close-btn">
        <CloseIcon />
      </button>
    </div>
  ) : (
    ""
  );
};

export default PopUp;
