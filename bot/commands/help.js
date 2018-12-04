module.exports = {
	run: (bot, db, guildDoc, msg, cmdParams) => {
		require('../lib/help')(bot, db, guildDoc, msg, cmdParams);
	},
	type: null,
	category: 'Client',
	description: 'List of available commands',
	permNeeded: null,
	params: [
		{
			name: 'query',
			optional: true,
			description: 'Command name, category, or type.',
			default: null
		}
	]
};