const express = require('express');
const router = express.Router();

/* GET home page. */
module.exports = (db) => {

  // get all the coins in a user's portfolio
  router.get('/coin', function(req, res) {
    // store the user's id
    const userId = req.query['userId']
    db.query(`
    SELECT coin_id, holdings, coins.name, portfolio_coins.id
    FROM portfolio_coins
    JOIN users ON user_id = users.id
    JOIN coins ON coin_id = coins.id
    WHERE users.id = $1;`
    , [userId])
      .then((data) => {
        res.json({ holdings: data.rows })
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
        VALUES ($1, $2, 0) RETURNING coin_id, portfolio_coins.id;
        `, [userId, fetchedCoinId])
          .then((data) => {
            console.log(data);
            res.json({ coinId: data.rows[0].coin_id, portfolioCoinsId: data.rows[0].id })
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

// have /api/coin/transactions
// get request will get all the transactions for that coin for that user
// post request will add 1 transaction for that coin for that user
// put request will delete 1 transaction for that coin for that user


// <Link to> in the button so that it redirects to the transactions page and in the transactions page, will make get request
// to get all the info?

{/* <Link to={{ 
 pathname: "/register", 
 state: data_you_need_to_pass 
}}>
 Register
</Link> */}

// how to access that state data: props.location.state. can store data such as holdings, holdings price, userId,

