

require('./bin/database');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var flash = require('connect-flash');
var session = require('express-session');
var sessionStore = new session.MemoryStore;
var bodyParser = require('body-parser')
var passport =  require('passport');
var expressSession = require('express-session');
//
var pokestopRouter = require('./routes/pokestop');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var pokesRouter=require('./routes/pokemon');
var itemsRouter=require('./routes/item');
var bagsRouter=require('./routes/bags');
var adsRouter=require('./routes/ads');
var accountRouter=require('./routes/account');
var PokemonRouter=require('./routes/adminpokemon');
var adminItemsRouter=require('./routes/adminItem')
var adminPokestop=require('./routes/adminPokestop');;
var vnpayRouter=require('./routes/vnpay');
var nganluongRouter=require('./routes/nganluong');
var braintreeRouter=require('./routes/braintree');
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Flash- mess
app.use(session({
  cookie: { maxAge: 60000*60*60 },
  store: sessionStore,
  saveUninitialized: true,
  resave: 'true',
  secret: 'secret'
}));
app.use(flash());

// Body-parser
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

// Passport
require('./passport/login.pasport')(passport);

app.use(expressSession({secret: 'mysecret'}));
app.use(passport.initialize());
app.use(passport.session());
// Initialize Passport

var loginRouter = require('./routes/login')(passport);

//Mount routers
app.use('/home', indexRouter);
app.use('/users', usersRouter);
app.use('/', loginRouter);
app.use('/pokemon',pokesRouter);
app.use('/', pokestopRouter);
app.use('/items',itemsRouter);
app.use('/bags',bagsRouter);
app.use('/admin/ads',adsRouter);
app.use('/admin/account',accountRouter);
app.use('/admin/pokemon',PokemonRouter);
app.use('/admin/item',adminItemsRouter);
app.use('/admin/pokestop',adminPokestop);
app.use('/', nganluongRouter);
app.use('/braintree', braintreeRouter);


app.use('/ads',adsRouter);
app.use('/vnpay',vnpayRouter);
// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');



//app.use('/', indexRouter);
//app.use('/users', usersRouter);
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
