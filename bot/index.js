const { Client } = require('./discord');

module.exports = (db) => {
	let bot = new Client(db);
	bot.login();
	return bot;
};
