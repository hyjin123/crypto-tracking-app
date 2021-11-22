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
/* GET users listing. */
module.exports = (db) => {
  router.post('/', function(req, res) {
    //authenticate the user

    const email = req.body.email;
    const user = { email: email};
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken: accessToken })
  });

  return router;
};
