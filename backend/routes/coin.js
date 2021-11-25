const express = require('express');
const router = express.Router();

module.exports = (db) => {

  // get all the transactions in a user's portfolio for THAT Specific coin (omg)
  router.get('/transaction', function(req, res) {
    const userId = req.query['userId']
    const coinName = req.query['coinName']
    
    // transactions has portfolio_coin_id to match with user_id and coin_id
    db.query(`
    SELECT id, name
    FROM coins
    WHERE name = $1;`
    , [coinName])
      .then((data) => {
        const fetchedCoinId = data.rows[0].id;
        db.query(`
        SELECT portfolio_coins_id, type, price_per_coin, quantity, total_spent, date, fee, note
        FROM transactions
        JOIN portfolio_coins ON portfolio_coins_id = portfolio_coins.id
        WHERE user_id = $1 AND coin_id = $2;
        `, [userId, fetchedCoinId])
          .then(data => {
            res.json({ allTransactions: data.rows })
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  })

  // adds new transaction in for a user
  router.post('/transaction', function(req, res) {
    const {
      type,
      price_per_coin,
      quantity,
      total_spent,
      date,
      fee,
      note
    } = req.body;

    console.log(req.body);
  })

  return router;

};