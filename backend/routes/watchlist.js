var express = require('express');
var router = express.Router();

/* GET home page. */
module.exports = (db) => {
  router.get('/coin', function(req, res) {
    const userId = req.query['userId'];
    db.query(`
    SELECT coin_id, coins.name
    FROM watchlist_coins
    JOIN users ON user_id = users.id
    JOIN coins ON coin_id = coins.id
    WHERE users.id = $1;
    `, [userId])
      .then(data => {
        res.json({ watchlistCoins: data.rows })
      })
      .catch(err => console.log(err))
  });

  router.post('/coin', function(req, res) {
    console.log(req.body)
    const coinName = req.body.coinName;
    const userId = req.body.userId;
    // query the coin id with the coin name
    db.query(`
    SELECT coins.id
    FROM coins
    WHERE name = $1;
    `, [coinName])
      .then(data => {
        const coinId = data.rows[0].id;
        db.query(`
        INSERT INTO watchlist_coins (user_id, coin_id)
        VALUES ($1, $2)
        `, [userId, coinId])
          .then(data => {
            console.log("success!")
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))

  });
  return router;
};
