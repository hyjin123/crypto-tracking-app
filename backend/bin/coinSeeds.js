const axios = require("axios");
const db = require('../db');

// inserting the coins into the database by running npm run seed
axios
  .get(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
  )
  .then((res) => {
    const coinGeckoCoins = res.data;
    console.log(coinGeckoCoins)
    // make a post request to the backend to store the coin id and the name (only) to the database
    for (let i = 0; i < coinGeckoCoins.length; i++) {
      let coin = coinGeckoCoins[i]
      db.query(`INSERT INTO coins (name) VALUES ($1)`, [coin.name])
        .then((data) => {
          console.log("inserted coin into the database!", coin.name, i);
          if(i === coinGeckoCoins.length - 1) {
            db.end()
          }
        })
        .catch(err => {
          console.log(err);
        })
    }
  })
  .catch((error) => console.log(error));