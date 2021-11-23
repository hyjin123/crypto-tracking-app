import React from "react";
import "../../App.css";
import "./portfolio.css";
import { Button } from "@mui/material";
import PopUp from "./PopUp";
import { useState } from "react";

const AddNewCoin = (props) => {
  const [buttonPopup, setButtonPopup] = useState(false);

  return (
    <React.Fragment>
      <Button onClick={() => setButtonPopup(true)} variant="contained">Add New Coin</Button>
      <PopUp trigger={buttonPopup} setTrigger={setButtonPopup} />
    </React.Fragment>
  );
};

export default AddNewCoin;
