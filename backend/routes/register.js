const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const authenticateToken = require("../helpers/authentication"); 

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
          `INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING id, first_name, last_name;`, userContent)
          .then(data => {
            console.log("Inserted the user into the database!");
            const id = data.rows[0].id;
            const first_name = data.rows[0].first_name;
            const last_name = data.rows[0].last_name;
            const user = { id: id, first_name: first_name, last_name: last_name };
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
            res.json({ accessToken: accessToken, user:user, redirect: 'http://localhost:3000/'});
          })
          .catch(err => {
            res
              .status(500)
              .json({ error: err.message });
          })
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      })

    });
  return router;
};
