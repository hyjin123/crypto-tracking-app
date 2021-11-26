const express = require('express');
const router = express.Router();

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
            res.json({ data: data})
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  });

  //this deletes the coin from the watchlist
  router.put('/coin', function(req,res) {
    const coinName = req.body.coinName;
    const userId = req.body.userId;
    db.query(`
    SELECT coins.id
    FROM coins
    WHERE name = $1;
    `, [coinName])
      .then(data => {
        const coinId = data.rows[0].id;
        db.query(`
        DELETE FROM watchlist_coins
        WHERE user_id = $1 AND coin_id = $2
        RETURNING coin_id;
        `, [userId, coinId])
          .then(data => {
            res.json({ coinId: data.rows[0].coin_id })
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  });

  return router;
};
