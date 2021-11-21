import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { makeStyles } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import MenuIcon from "@mui/material/Menu";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = (props) => {
  return (
    <AppBar id="appbar" position="fixed">
      <Toolbar id="logo">Crypto</Toolbar>
      <Toolbar id="navbar">
        <Typography variant="h6" color="white" component="div">
          <Link to="/" className="linkbar">
            Home
          </Link>
        </Typography>
        <Typography variant="h6" color="white" component="div">
          <Link to="/watchlist" className="linkbar">
            Watchlist
          </Link>
        </Typography>
        <Typography variant="h6" color="white" component="div">
          <Link to="/portfolio" className="linkbar">
            Portfolio
          </Link>
        </Typography>
        <Typography variant="h6" color="white" component="div">
          <Link to="/register" className="linkbar">
            Register
          </Link>
        </Typography>
        <Typography variant="h6" color="white" component="div">
          <Link to="/login" className="linkbar">
            Login
          </Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
