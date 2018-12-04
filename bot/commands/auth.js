const {discord} = require('../../config/index');

module.exports = {
	run: (bot, db, guildDoc, msg, cmdParams) => {
		msg.reply(`Authorize at http://localhost:8080/console/auth`);
	},
	type: null,
	category: 'Test',
	description: 'Connect your account',
	permNeeded: null,
	params: []
};
