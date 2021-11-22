import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { makeStyles } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = (props) => {
  // retrieve the token from local storage, if empty string, you need to logged in.
  const token = localStorage.getItem('jwtToken')
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
          <Link to="/logout" className="linkbar">
            Logout
          </Link>
        </Typography>
        }
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
