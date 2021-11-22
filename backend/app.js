const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require('./db');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const indexRouter = require('./routes/index');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const logoutRouter = require('./routes/logout');
const usersRouter = require('./routes/users');
const watchlistRouter = require('./routes/watchlist');
const portfolioRouter = require('./routes/portfolio');
const coinsRouter = require('./routes/coins');
const isUserAuthRouter = require('./routes/isUserAuth');

// Back-End Routes
app.use('/', indexRouter(db));
app.use('/register', registerRouter(db));
app.use('/login', loginRouter(db));
app.use('/logout', logoutRouter(db));
app.use('/isUserAuth', isUserAuthRouter(db));
app.use('/api/users', usersRouter(db));
app.use('/api/watchlist', watchlistRouter(db));
app.use('/api/portfolio', portfolioRouter(db));
app.use('/api/coins', coinsRouter(db));

module.exports = app;
