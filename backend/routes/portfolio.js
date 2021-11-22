var express = require('express');
var router = express.Router();
const authenticateToken = require("../helpers/authentication"); 

/* GET home page. */
module.exports = (db) => {

  router.get('/', authenticateToken, function(req, res, next) {
    console.log("you visited portfolio")
    console.log(req.body.user)

  });
  
  router.put('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
  });

  return router;
};
