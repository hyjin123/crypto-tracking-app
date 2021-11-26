const express = require('express');
const router = express.Router();

/* GET home page. */
module.exports = (db) => {

  // get all the coins in a user's portfolio
  router.get('/coin', function(req, res) {
    // store the user's id
    const userId = req.query['userId']
    db.query(`
    SELECT coin_id, holdings, coins.name
    FROM portfolio_coins
    JOIN users ON user_id = users.id
    JOIN coins ON coin_id = coins.id
    WHERE users.id = $1;`
    , [userId])
      .then((data) => {
        res.json({ holdings: data.rows})
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      })
  });

  router.post('/coin', function(req, res) {
    // store the name into a varaible
    const coinName = req.body.coinName;
    const userId = req.body.userId;
    // query to get the coin_id
    db.query(`
    SELECT id, name
    FROM coins
    WHERE name = $1;`
    , [coinName])
      .then((data) => {
        const fetchedCoinId = data.rows[0].id;
        //query to insert into the portfolio coins
        db.query(`
        INSERT INTO portfolio_coins (user_id, coin_id, holdings)
        VALUES ($1, $2, 0) RETURNING coin_id;
        `, [userId, fetchedCoinId])
          .then((data) => {
            res.json({ coinId: data.rows[0].coin_id })
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  })

  return router;
};

// SELECT name
// FROM coins
// WHERE name = $1