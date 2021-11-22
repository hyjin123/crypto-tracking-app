var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const authenticateToken = require('../helpers/authentication');
require('dotenv').config();

module.exports = (db) => {
  router.get('/', authenticateToken, function(req, res) {
    const user = req.user;
    res.json({ user })
  });

  return router;
};
