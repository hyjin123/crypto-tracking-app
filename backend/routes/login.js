var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
require('dotenv').config();
const authenticateToken = require("../helpers/authentication"); 

module.exports = (db) => {
  router.post('/', function(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    db.query(`SELECT id, first_name, email, password FROM users WHERE email = $1`, [email])
      .then(data => {
        const id = data.rows[0].id;
        const first_name = data.rows[0].first_name;
        const last_name = data.rows[0].last_name;
        const hashedPassword = data.rows[0].password;
        if (!email || !password) {
          res.status(400).send({ message: "Invalid e-mail or password." });
        } else if (bcrypt.compareSync(password, hashedPassword)) {
          //then password matches
            const user = { id: id, first_name: first_name, last_name: last_name };
            const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
            res.json({ accessToken: accessToken, user:user, redirect: 'http://localhost:3000/'});
        } else {
          res.status(400).send({ message: "Invalid e-mail or password." });
        }
      }) 
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      })

  });

  return router;
};
