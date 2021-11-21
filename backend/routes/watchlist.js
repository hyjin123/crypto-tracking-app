var express = require('express');
var router = express.Router();

/* GET home page. */
module.exports = (db) => {
  router.put('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });

  return router;
};
