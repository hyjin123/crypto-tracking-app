import React, { useState } from "react";
import axios from "axios";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { makeStyles } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { useScrollTrigger } from "@mui/material";

const Navbar = (props) => {
  const [userName, setUserName] = useState("");
  
  // retrieve the token from local storage, if empty string, you need to logged in.
  const token = localStorage.getItem('jwtToken')

  // handle the logout click
  const handleClick = (event) => {
    event.preventDefault();
    axios.post('/logout')
      .then((res) => {
        console.log("logout successful!");
        // reset the localstorage value to an empty string
        localStorage.setItem('jwtToken', '', { maxAge: 1})
        // redirect to the home page
        window.location = res.data.redirect
      })
      .catch((err) => {
        console.log(err);
      })
  };

  return (
    <AppBar id="appbar" position="fixed">
      <Toolbar id="navbar">
        <Typography variant="h4" id="logo" component="div">
          <Link to="/" className="linkbar">
            Crypto
          </Link>
        </Typography>
      </Toolbar>
      <Toolbar>
        <Typography variant="h6" color="white" component="div">
          <Link to="/" className="linkbar">
            Home
          </Link>
        </Typography>
        {token && 
        <Typography variant="h6" color="white" component="div">
          <Link to="/watchlist" className="linkbar">
            Watchlist
          </Link>
        </Typography>
        }
        {token &&
        <Typography variant="h6" color="white" component="div">
          <Link to="/portfolio" className="linkbar">
            Portfolio
          </Link>
        </Typography>
        }
        {!token &&
        <Typography variant="h6" color="white" component="div">
          <Link to="/register" className="linkbar">
            Register
          </Link>
        </Typography>
        }
        {!token &&
        <Typography variant="h6" color="white" component="div">
          <Link to="/login" className="linkbar">
            Login
          </Link>
        </Typography>
        }
        {token &&
        <Typography variant="h6" color="white" component="div">
          <Button onClick={handleClick} className="linkbar">
            Logout
          </Button>
        </Typography>
        }
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
