var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

/* GET users listing. */
module.exports = (db) => {
  router.post('/', function(req, res) {
    const { first_name, last_name, email} = req.body;
    // hash the password
    const password = bcrypt.hashSync(req.body.password, 10);
    //validate if the user email already exists in the database
    db.query(
      `SELECT email FROM users;`
    )
    .then(data => {
      for (const user of data.rows) {
        if (user.email === email) {
          return res.status(400).send({ message: "This email already exists" });
        }
      }
      // create the new user in the database
      // create query params
      const userContent = [first_name, last_name, email, password];
      db.query(
        `INSERT INTO users (first_name, last_name, email, password)
        VALUES ($1, $2, $3, $4);`, userContent)
      .then(data => {
        console.log("entered into database!");
      })
      .catch(err => {
        res.status(500);
      })
    })
    .catch(err => {
      res.status(500);
    })

  });

  return router;
};
