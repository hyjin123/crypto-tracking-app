var express = require('express');
var router = express.Router();

/* GET home page. */
module.exports = (db) => {

  // get all the coins in a user's portfolio
  router.get('/coin', function(req, res) {
    // store the user's id
    const userId = req.query['userId']
    db.query(`
    SELECT portfolio_id, coin_id, holdings, coins.name
    FROM portfolio_coins
    JOIN portfolios ON portfolio_id = portfolios.id
    JOIN users ON user_id = users.id
    JOIN coins ON coin_id = coins.id
    WHERE users.id = $1;`
    , [userId])
      .then((data) => {
        console.log(data.rows);
        res.json({ holdings: data.rows})
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      })

  });

  return router;
};
