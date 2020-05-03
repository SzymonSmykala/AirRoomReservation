'use strict';
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');
const passport = require('passport');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const roomsRouter = require('./routes/rooms');
const reservationsRouter = require('./routes/reservations');

const app = express();

const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json());
app.use('/rooms', roomsRouter);
require('dotenv/config');
require('./auth/auth');

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true })
  .catch(error => console.log(error));

// app.use('/', routes);
//We plugin our jwt strategy as a middleware so only verified users can access this route
// app.use('/user', passport.authenticate('jwt', { session : false }), secureRoute );

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/reservations', reservationsRouter);
let secureRoute = require('./routes/secure-routes')
app.use('/user', passport.authenticate('jwt', { session : false }), secureRoute);


module.exports = app;
