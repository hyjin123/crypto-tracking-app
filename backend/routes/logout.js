var express = require('express');
var router = express.Router();

/* GET users listing. */
module.exports = (db) => {
  router.post('/', function(req, res) {
    db.query('SELECT * FROM users;')
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      })
  });

  return router;
};
