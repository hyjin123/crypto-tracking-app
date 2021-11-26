const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const authenticateToken = require('../helpers/authentication');
require('dotenv').config();

module.exports = (db) => {
  router.get('/', authenticateToken, function(req, res) {
    const user = req.user;
    res.json({ user });
  });

  return router;
};
