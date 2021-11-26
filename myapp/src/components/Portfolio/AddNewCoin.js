import React from "react";
import "../../App.css";
import "./portfolio.css";
import { Button } from "@mui/material";
import PopUp from "./PopUp";
import { useState } from "react";
import { makeStyles } from "@mui/styles";

// this is a makeStyles hook (Custom css)
const useStyles = makeStyles({
  button: {
    color: "#1976d2",
    backgroundColor: "black",
    border: "1px solid rgba(25, 118, 210, 0.5)",
    '&:hover': {
      border: "1px solid rgba(25, 118, 210, 1)",
      backgroundColor: "black"
   },
  },
});

const AddNewCoin = (props) => {
  const [buttonPopup, setButtonPopup] = useState(false);
  const { handleAddCoin, userId } = props;
  const classes = useStyles();

  return (
    <React.Fragment>
      <Button className={classes.button} onClick={() => setButtonPopup(true)} variant="contained">Add New Coin</Button>
      <PopUp holdings={props.holdings} userId={userId} trigger={buttonPopup} setTrigger={setButtonPopup} handleAddCoin={handleAddCoin} />
    </React.Fragment>
  );
};

export default AddNewCoin;
