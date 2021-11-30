import React, { useState, useEffect } from "react";
import { Navigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import "../App.css";
import "./Portfolio/portfolio.css"
import Navbar from "./Navbar";
import PopUp from "./PopUp";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";
import Exchanges from "./Exchanges";


function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography sx={{ color: 'white' }} >{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function Home() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  // fetches userId from JWT authentication
  const [userId, setUserId] = useState(0);
  // this manages the popup that shows when user clicks on the add to watchlist button
  const [isVisible, setIsVisible] = useState(false);
  // sets state for page numbers
  const [tabNumber, setTabNumber] = useState(0);
  const { page } = useParams();
  
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
        setUserId(user.id);
      })
      .catch((err) => console.log(err));
  }, []);

  // fetches coin data from the coingecko API
  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=${!page ? 1 : page}&sparkline=false`
      )
      .then((res) => {
        console.log(res.data)
        setCoins(res.data);
      })
      .catch((error) => console.log(error));
  }, [page]);

  // handles when user clicks Add to Watchlist
  const handleAddToWatchlist = (coinName, userId) => {
    // add the new coin to the database by making a post request to the backend
    axios
      .post("/api/watchlist/coin", {
        coinName: coinName,
        userId: userId,
      })
      .then((res) => {
        setIsVisible(true);
      })
      .catch((err) => console.log(err));
  };
  
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleTabChange = (e, value) => {
    setTabNumber(value);
  };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  console.log(filteredCoins);

  return (
    <div className="App">
      <Navbar />
      {!token && <Navigate to={{ pathname: "/login" }}></Navigate>}
      <div>
        <PopUp trigger={isVisible} setTrigger={setIsVisible} />
        <div className="coin-app" style={{ marginTop: '3em' }}>
          <div className="coin-search">
            <h1 className="coin-text">Search a currency</h1>
            <form>
              <input
                className="coin-input"
                type="text"
                onChange={handleChange}
                placeholder="Search"
              />
            </form>
          </div>
          <Box sx={{ borderBottom: 1, borderColor: 'divider', margin: '2em 13em'}}>
            <Tabs centered value={tabNumber} onChange={handleTabChange} aria-label="basic tabs example" sx={{ display: 'flex', justifyContent: 'center'}}>
              <Tab label="Cryptocurrencies" sx={{ color: "#5d6870" }}/>
              <Tab label="Exchanges" sx={{ color: "#5d6870" }} />
            </Tabs>
          </Box>


          <Box sx={{ width: "65%", margin: "auto"}}>
          <TabPanel value={tabNumber} index={0}>
          <div className="table-container">
          <Table size="medium">
            <TableHead sx={{ color: "white"}}>
              <TableRow className="table-row" sx={{ color: "white"}}>
                <TableCell>
                </TableCell>
                <TableCell sx={{ color: "white", fontSize: "18px", fontWeight: "bold"}}>Name</TableCell>
                <TableCell sx={{ color: "white", fontSize: "18px", fontWeight: "bold"}}>Price</TableCell>
                <TableCell sx={{ color: "white", fontSize: "18px", fontWeight: "bold"}}>24 hr High</TableCell>
                <TableCell sx={{ color: "white", fontSize: "18px", fontWeight: "bold"}}>24 hr Low</TableCell>
                <TableCell sx={{ color: "white", fontSize: "18px", fontWeight: "bold"}}>24 Hour (%)</TableCell>
                <TableCell sx={{ color: "white", fontSize: "18px", fontWeight: "bold"}}>Market Cap</TableCell>
                <TableCell sx={{ color: "white", fontSize: "18px", fontWeight: "bold"}}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredCoins.map((coin, index) => (
                <TableRow key={index} className="table-row">
                  <TableCell >
                    <Button component={Link} to={{ pathname: "/coin-history"}}
                      state={{
                      coinName: coin.name,
                      coinId: coin.id,
                      price: coin.current_price,
                      marketCap: coin.market_cap,
                      volume: coin.total_value,
                      image: coin.image,
                      priceChange: coin.price_change_percentage_24h
                    }}
                    >
                    <img className="table-image" src={coin.image} alt="coin" />
                    </Button>
                  </TableCell>
                  <TableCell sx={{ color: "white", fontSize: "16px", padding: "0px 20px"}}>
                    {coin.name}
                  </TableCell>
                  <TableCell sx={{ color: "white", fontSize: "16px", padding: "0px 20px"}}>
                    ${coin.current_price.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                  </TableCell>
                  <TableCell sx={{ color: "white", fontSize: "16px", padding: "0px 20px"}}>
                    ${coin.high_24h.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                  </TableCell>
                  <TableCell sx={{ color: "white", fontSize: "16px", padding: "0px 20px"}}>
                    ${coin.low_24h.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                  </TableCell>
                  {coin.price_change_percentage_24h > 0 ?
                  <TableCell sx={{ color: "#11d811", fontSize: "16px", padding: "0px 20px"}}>
                    {coin.price_change_percentage_24h.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}%
                  </TableCell> :
                  <TableCell sx={{ color: "#f00606", fontSize: "16px", padding: "0px 20px"}}>
                    {coin.price_change_percentage_24h.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}%
                  </TableCell>
                  }
                  <TableCell sx={{ color: "white", fontSize: "16px", padding: "0px 20px"}}>
                    ${coin.market_cap.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                  </TableCell>
                  <TableCell sx={{ color: "white", fontSize: "16px", padding: "0px 20px"}}>
                    <div className="coin-button">
                      <Button
                        onClick={() => handleAddToWatchlist(coin.name, userId)}
                        sx={{ color: "white" }}>
                        <AddIcon />
                        <p className="coin-watchlist">Add to Watchlist</p>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="coin-pagination">
            <ul>
              <li>
                <Link to="/" className="coin-page-link">1 </Link>
              </li>
              <li>
                <Link to="/2" className="coin-page-link">2 </Link>
              </li>
              <li>
                <Link to="/3" className="coin-page-link">3 </Link>
              </li>
              <li>
                <Link to="/4" className="coin-page-link">4 </Link>
              </li>
              <li>
                <Link to="/5" className="coin-page-link">5 </Link>
              </li>
              <li>
                <Link to="/6" className="coin-page-link">6 </Link>
              </li>
              <li>
                <Link to="/7" className="coin-page-link">7 </Link>
              </li>
              <li>
                <Link to="/8" className="coin-page-link">8 </Link>
              </li>
              <li>
                <Link to="/9" className="coin-page-link">9 </Link>
              </li>
              <li>
                <Link to="/10" className="coin-page-link">10 </Link>
              </li>
            </ul>
            </div>
          </div>
          </TabPanel>
          <TabPanel value={tabNumber} index={1}>
            <Exchanges />
          </TabPanel>
          </Box>
        </div>


      </div>


    </div>
  );
}

export default Home;

{/* <div className="coin-container">

<div className="coin-row">
  <div className="coin">
    <Button component={Link} to={{ pathname: "/coin-history"}}
      state={{
      coinName: name,
      coinId: coinId,
      price: price,
      marketCap: marketcap,
      volume: volume,
      image: image,
      priceChange: priceChange
    }}
    >
      <img src={image} alt="crypto" />
    </Button>
    <h1>{name}</h1>
    <p className="coin-symbol">{symbol}</p>
  </div>
  <div className="coin-data">
    <p className="coin-price">${price}</p>
    <p className="coin-volume">{volume.toLocaleString()}</p>

    {priceChange < 0 ? (
      <p className="coin-percent red">{priceChange.toFixed(2)}%</p>
    ) : (
      <p className="coin-percent green">{priceChange.toFixed(2)}%</p>
    )}

    <p className="coin-marketcap">
      ${marketcap.toLocaleString()}
    </p>
  </div>
</div>
<div className="coin-button">
    <Button
      className={classes.button}
      onClick={() => handleAddToWatchlist(name, userId)}
    >
      <AddIcon />
      <p className="coin-watchlist">Add to Watchlist</p>
    </Button>
</div>
</div> */}





