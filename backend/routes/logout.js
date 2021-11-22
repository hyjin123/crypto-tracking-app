var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (db) => {
  router.post('/', function(req, res) {
    res.cookie('jwt', '', { maxAge: 1})
    res.redirect('/')

    //invalidate token
  });

  return router;
};
