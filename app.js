var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var roomsRouter = require('./routes/rooms');

var app = express();

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


module.exports = app;
