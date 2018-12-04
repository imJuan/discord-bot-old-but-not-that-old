module.exports = {
	run: (bot, db, guildDoc, msg, cmdParams) => {
		msg.channel.send('Hello!');
	},
	type: 'Private',
	category: 'Temp',
	description: 'Temporary private command',
	params: []
};