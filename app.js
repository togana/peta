const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const config = require('config');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
mongoose.connect(config.mongo.connection);

const authz = require('./lib/authz');

const api = require(`./routes${config.api.end_point}/index`);
const queryingUsers = require(`./routes${config.api.end_point}/user/queryingUsers`);
const signUp = require(`./routes${config.api.end_point}/user/signUp`);
const auth = require(`./routes${config.api.end_point}/auth`);

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const sessionConfig = config.session.config;
sessionConfig.store = new MongoStore({
  mongooseConnection: mongoose.connection,
});
app.use(session(sessionConfig));

// Public API
app.use(`${config.api.end_point}`, api);
app.use(`${config.api.end_point}/auth`, auth);
app.use(`${config.api.end_point}/user`, signUp);

// Authorization Required
app.use(`${config.api.end_point}/user`, authz.required(), queryingUsers);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use((err, req, res) => {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err,
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {},
  });
});


module.exports = app;
