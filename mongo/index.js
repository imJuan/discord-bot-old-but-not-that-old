const mongoose = require('mongoose');
const {mongo}  = require('../config/index');

mongoose.Promise = Promise;

// Couldn't connect
mongoose.connection.on('error', err => {
	console.error(`Couldn't connect to mongo: ${err.message}`);
});

// Connected successful
mongoose.connection.once('open', err => {
	if (err) {
		console.error(err);
	} else {
		mongoose.model('guilds', require('./schemas/guilds'));
		mongoose.model('users', require('./schemas/users'));

		console.log('Database is ready!');
	}
});

// Establish connection
mongoose.connect(mongo.url, {
	autoReconnect: true
});

module.exports = mongoose.models;
