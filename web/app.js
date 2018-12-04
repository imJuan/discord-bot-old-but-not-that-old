const path     = require('path');
const express  = require('express');
const db       = require('../mongo/index');
const bot      = require('../bot/index')(db);
const {server} = require('../config/index');
const session  = require('express-session');
const passport = require('passport');

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((id, done) => {
	done(null, id);
});

const app = express();

/**
 * Application settings
 */
app.set('env', process.env);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', server.port);

/**
 * Middleware
 */
app.use(session({secret: 'keyboard dog', resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
	req.db  = db;
	req.bot = bot;
	next();
});
//todo: check if bot and db are online

/**
 * Routes
 */
app.use('/', require('./routes/index'));
app.use('/editor', require('./routes/editor'));
app.use('/console', require('./routes/console'));
app.use('/throwerror', require('./routes/throwError'));

/**
 * Error handling
 */
app.use('*', require('./routes/notFound'));
app.use(require('./routes/errorHandler'));

module.exports = app;