var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const authenticateToken = require('../helpers/authentication');
require('dotenv').config();

module.exports = (db) => {
  router.post('/', authenticateToken, function(req, res) {

  });

  return router;
};
