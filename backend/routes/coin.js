const express = require("express");
const router = express.Router();

module.exports = (db) => {
  // get all the transactions in a user's portfolio for THAT Specific coin (omg)
  router.get("/transaction", function (req, res) {
    const userId = req.query["userId"];
    const coinName = req.query["coinName"];

    // transactions has portfolio_coin_id to match with user_id and coin_id
    db.query(
      `
    SELECT id, name
    FROM coins
    WHERE name = $1;`,
      [coinName]
    )
      .then((data) => {
        const fetchedCoinId = data.rows[0].id;
        db.query(
          `
        SELECT transactions.id AS transaction_id, portfolio_coins.id , type, price_per_coin, quantity, total_spent, date, fee, note
        FROM portfolio_coins
        JOIN transactions ON portfolio_coins_id = portfolio_coins.id
        WHERE user_id = $1 AND coin_id = $2;
        `,
          [userId, fetchedCoinId]
        )
          .then((data) => {
            res.json({ allTransactions: data.rows });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });

  // adds new transaction in for a user
  router.post("/transaction", function (req, res) {
    const {
      portfolio_coins_id,
      type,
      price_per_coin,
      quantity,
      total_spent,
      date,
      fee,
      note,
    } = req.body;

    const queryParams = [
      portfolio_coins_id,
      type,
      price_per_coin,
      quantity,
      total_spent,
      date,
      fee,
      note,
    ];

    db.query(
      `
    INSERT INTO transactions (portfolio_coins_id, type, price_per_coin, quantity, total_spent, date, fee, note)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
    `,
      queryParams
    )
      .then((data) => {
        res.json({ data });
      })
      .catch((err) => console.log(err));
  });

  //this deletes the coin from the watchlist
  router.put("/transaction", function (req, res) {
    const transactionId = req.body.transactionId;
    db.query(
      `
      DELETE FROM transactions
      WHERE transactions.id = $1;
      `,
      [transactionId]
    )
      .then((data) => {
        res.json({data})
      })
      .catch((err) => console.log(err));
  });

  return router;
};
