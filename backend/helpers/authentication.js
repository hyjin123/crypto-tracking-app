const jwt = require('jsonwebtoken');
require('dotenv').config();

// Middleware function for authentication
function authenticateToken(req, res, next) {
  // pass down header in this format, header name should be 'authorization'. header value should Bearer 'token'
  const authHeader = req.headers['authorization']; 
  // ingnoring the bearer and getting just the token value
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

module.exports = authenticateToken;