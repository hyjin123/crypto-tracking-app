var express = require('express');
var router = express.Router();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) {
    return res.sendStatus(401)
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403)
    }
    req.user = user
    next()
  })
}

module.exports = (db) => {
  router.post('/', function(req, res) {
    const email = req.body.email;
    const password = req.body.password;

    db.query(`SELECT id, email, password FROM users WHERE email = $1`, [email])
      .then(data => {
        const hashedPassword = data.rows[0].password;
        if (!email || !password) {
          res.status(400).send({ message: "Invalid e-mail or password." });
        } else if (bcrypt.compareSync(password, hashedPassword)) {
          //then password matches
          
        } else {
          res.status(400).send({ message: "Invalid e-mail or password." });
        }
      }) 
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      })
    //authenticate the user
    // const email = req.body.email;
    // const user = { email: email};
    // const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    // res.json({ accessToken: accessToken })
  });

  return router;
};
