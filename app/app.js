var express = require("express");
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var flash = require('flash');
var config = require('../config/ouvidoria');
var socket_io = require('socket.io');
var session = require('express-session');
var MongoStore = require('connect-mongo/es5')(session);
var app = express();

require('dotenv').config();

var io = socket_io();
app.io = io;

// Setting enviroment
var env = process.env.NODE_ENV || "prod";

// Setting up config
global.config = config;
global.connections = {};

var Cron = require('./scripts/cron');

// Startin up cron

// set up database
var dbConfig = require('../config/mongodb.js');
var mongoose = require('mongoose');
mongoose.connect(dbConfig.mongolab.url);

// passport stuff
var passport = require('passport');
require("../config/passport")(passport, env);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// private middlewars
var attachAuth = require('./middlewares/attachAuthenticationStatus');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('express-session')({
    secret: global.config.SECRET,
    maxAge: new Date(Date.now() + 3600000),
    resave: false,
    store: new MongoStore(
        {mongooseConnection:mongoose.connection},
        function (err) {
          console.error(err || "Connect-mongodb setup ok");
        }
    ),
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(attachAuth);

var attachNotifications = require('./middlewares/attachNotifications');
app.use(attachNotifications);

var attachTagCloud = require("./middlewares/tagCloud");
app.use(attachTagCloud);

// Set public dir
app.use(express.static(path.join(__dirname, '../public')));

// Set up routes
var routes = require('./routes')(io);
app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  console.error(err);
  res.json({
    status: err.status || 500,
    message: err.message,
    stack: (err.status == 404) ? undefined : err.stack
  });
});

module.exports = app;
