import React, { useState, useEffect } from "react";
import { Navigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import "../App.css";
import Coin from "./Coin";
import Navbar from "./Navbar";
import PopUp from "./PopUp";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import Exchanges from "./Exchanges";
import TabContext from "@mui/lab/TabContext";

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
        setCoins(res.data);
      })
      .catch((error) => console.log(error));
  }, [page]);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  const handleTabChange = (e, value) => {
    setTabNumber(value);
  };

  // this sets the timeout on the popup when add to watchlist button is clicked, stretch feature
  // const popUpTimeOut = () => {
  // };

  const filteredCoins = coins.filter((coin) =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

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
          <TabPanel value={tabNumber} index={0}>


            {filteredCoins.map((coin) => {
              return (
                <Coin
                  key={coin.id}
                  userId={userId}
                  name={coin.name}
                  price={coin.current_price}
                  symbol={coin.symbol}
                  marketcap={coin.market_cap}
                  volume={coin.total_volume}
                  image={coin.image}
                  priceChange={coin.price_change_percentage_24h}
                  setIsVisible={setIsVisible}
                />
              );
            })}
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
          </TabPanel>
          <TabPanel value={tabNumber} index={1}>
            <Exchanges />
          </TabPanel>
        </div>


      </div>


    </div>
  );
}

export default Home;
