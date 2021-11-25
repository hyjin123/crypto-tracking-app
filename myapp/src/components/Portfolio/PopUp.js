import { React, useState, useEffect } from "react";
import "../../App.css";
import "./portfolio.css";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import Coin from "./Coin";

const PopUp = (props) => {
  const [search, setSearch] = useState("");
  const [coins, setCoins] = useState([]);

  const { handleAddCoin, userId } = props;

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setCoins(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  // set search whenever there is input change in the search
  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  // filter the coin based on search
  const filteredCoins = coins.filter((eachCoin) =>
    eachCoin.name.toLowerCase().includes(search.toLowerCase())
  );

  // map all the components based on the filtered coins above
  const coinsArray = filteredCoins.map((eachCoin) => {
    return (
      <Coin
        key={eachCoin.id}
        name={eachCoin.name}
        symbol={eachCoin.symbol}
        image={eachCoin.image}
        handleAddCoin={handleAddCoin}
        userId={userId}
        holdings={props.holdings}
      />
    );
  });

  // show only the first 10 results on the pop up search
  const coinsArrayFiltered = coinsArray.slice(0, 10);

  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button onClick={() => props.setTrigger(false)} className="close-btn">
          <CloseIcon />
        </button>
        <div className="coin-search">
          <h2>Search your coin</h2>
          <form>
            <input
              className="coin-input"
              type="text"
              onChange={handleChange}
              placeholder="Search"
            />
          </form>
          <div>{coinsArrayFiltered}</div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
};

export default PopUp;
