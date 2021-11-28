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

  // get all the transactions for a user
  router.get("/all-transactions", function (req, res) {
    const userId = req.query["userId"];

    // transactions has portfolio_coin_id to match with user_id and coin_id
    db.query(
      `
        SELECT total_spent, type
        FROM portfolio_coins
        JOIN transactions ON portfolio_coins_id = portfolio_coins.id
        WHERE user_id = $1;
        `,
      [userId]
    )
      .then((data) => {
        res.json({ allTransactions: data.rows });
      })
      .catch((err) => console.log(err));
  });

  // get all transactions for a user for the last 7 days
  router.get("/seven-day-transactions", function (req, res) {
    const userId = req.query["userId"];

    // transactions has portfolio_coin_id to match with user_id and coin_id
    db.query(
      `
        SELECT total_spent, type
        FROM portfolio_coins
        JOIN transactions ON portfolio_coins_id = portfolio_coins.id
        WHERE user_id = $1;
        `,
      [userId]
    )
      .then((data) => {
        res.json({ allTransactions: data.rows });
      })
      .catch((err) => console.log(err));
  });

  // adds new transaction in for a user
  router.post("/transaction", function (req, res) {
    let {
      portfolio_coins_id,
      type,
      price_per_coin,
      quantity,
      total_spent,
      date,
      fee,
      note,
    } = req.body;

    // if selling transaction, total_spent is converted to negative number
    if (type === "Sell") {
      total_spent = total_spent * -1;
    }

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
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING portfolio_coins_id, quantity, type;
    `,
      queryParams
    )
      .then((data) => {
        const quantity = data.rows[0].quantity;
        const portfolioCoinId = data.rows[0].portfolio_coins_id;
        const type = data.rows[0].type;
        if (type === "Buy") {
          db.query(
            `
            UPDATE portfolio_coins SET holdings = holdings+$1
            WHERE portfolio_coins.id = $2;
            `,
            [quantity, portfolioCoinId]
          )
            .then((data) => {
              res.json({ data });
            })
            .catch((err) => console.log(err));
        } else {
          db.query(
            `
            UPDATE portfolio_coins SET holdings = holdings-$1
            WHERE portfolio_coins.id = $2;
            `,
            [quantity, portfolioCoinId]
          )
            .then((data) => {
              res.json({ data });
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  });

  //this deletes the coin from the watchlist
  router.put("/transaction", function (req, res) {
    const transactionId = req.body.transactionId;
    db.query(
      `
      DELETE FROM transactions
      WHERE transactions.id = $1 RETURNING portfolio_coins_id, quantity, type;
      `,
      [transactionId]
    )
      .then((data) => {
        const quantity = data.rows[0].quantity;
        const portfolioCoinId = data.rows[0].portfolio_coins_id;
        const type = data.rows[0].type;
        if (type === "Buy") {
          db.query(
            `
          UPDATE portfolio_coins SET holdings = holdings-$1
          WHERE portfolio_coins.id = $2;
          `,
            [quantity, portfolioCoinId]
          )
            .then((data) => {
              res.json({ data });
            })
            .catch((err) => console.log(err));
        } else {
          db.query(
            `
            UPDATE portfolio_coins SET holdings = holdings+$1
            WHERE portfolio_coins.id = $2;
            `,
            [quantity, portfolioCoinId]
          )
            .then((data) => {
              res.json({ data });
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  });

  return router;
};
