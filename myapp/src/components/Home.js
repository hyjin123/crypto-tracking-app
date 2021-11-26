import React, { useState, useEffect } from "react";
import { Navigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import "../App.css";
import Coin from "./Coin";
import Navbar from "./Navbar";
import PopUp from "./PopUp";

function Home() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  // fetches userId from JWT authentication
  const [userId, setUserId] = useState(0);
  // this manages the popup that shows when user clicks on the add to watchlist button
  const [isVisible, setIsVisible] = useState(false);
  // sets state for page numbers
  // const [pageNumber, setPageNumber] = useState();
  const {page} = useParams();
  console.log("hello", page);
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

      <PopUp trigger={isVisible} setTrigger={setIsVisible} />
      <div className="coin-app">
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
        {filteredCoins.map((coin) => {
          return (
            <Coin
              key={coin.id}
              userId={userId}
              name={coin.name}
              price={coin.current_price}
              symbol={coin.symbol}
              marketcap={coin.total_volume}
              volume={coin.market_cap}
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
      </div>
    </div>
  );
}

export default Home;
