var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
let MongoClient = require('mongodb').MongoClient;

let mongoURI = process.env.MONGODB_URI|| 'mongodb://localhost:27017/excellence';
//let mongoURI = 'mongodb+srv://bernoulliMukuna21:reJ2YhAXrv6mhMW@stickler-zmx1n.mongodb.net/test?authSource=admin&replicaSet=Stickler-shard-0&readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=true';
console.log('#########################################################################################################')
mongoose
    .connect(
        mongoURI,
        { useNewUrlParser: true }
    )
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));
console.log('#########################################################################################################')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var aboutRouter = require('./routes/aboutUs');
var contactRouter = require('./routes/contactUs');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/join', usersRouter);// using the same route
app.use('/login', usersRouter); //
app.use('/account', usersRouter);// Might be deleted as well
app.use('/about-us', aboutRouter);
app.use('/contact-us', contactRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
