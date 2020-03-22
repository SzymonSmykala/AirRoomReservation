var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const roomsRouter = require('./routes/rooms');
const reservationsRouter = require('./routes/reservations');

const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use('/rooms', roomsRouter);
require('dotenv/config');


mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }).
catch(error => console.log(error));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/reservations', reservationsRouter);


module.exports = app;
