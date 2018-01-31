var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var index = require('./routes/index');
var report = require('./routes/report');
var service = require('./routes/service');
var config = require('./routes/config');
var errors = require('./routes/errors');
var download = require('./routes/download');
var cors = require('cors')
var app = express();

var processStateRoute = require('./routes/process-state');

app.use(cors())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'backstop_data')));


app.use('/api/report', report);
app.use('/api/service', service);
app.use('/api/config', config);
app.use('/api/download', download);
app.use('/api/errors', errors);
app.use('/api/process-state', processStateRoute);
app.use('/', index);

module.exports = app;