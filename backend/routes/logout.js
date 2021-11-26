const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (db) => {
  router.post('/', function(req, res) {
    res.json({ redirect: 'http://localhost:3000/'});
  });

  return router;
};
