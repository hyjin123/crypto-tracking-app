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
    res.render('index', { title: 'Express' });
  });

  return router;
};
