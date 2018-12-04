const {RichEmbed} = require('discord.js');
const {secondsToHms} = require('../../lib/dates');

module.exports = {
	run: (bot, db, guildDoc, msg, cmdParams) => {
		let embed = new RichEmbed()
		.setTitle('About Bot')
		.setDescription(`todo`)
		.setColor('#01f400')
		.addField('Guilds', bot.guilds.size, true)
		.addField('Channels', bot.channels.size, true)
		.addField('Users', bot.users.size, true)
		.addField('Uptime', secondsToHms(bot.uptime / 1000), true);

		msg.channel.send({embed});
	},
	type: null,
	category: 'Client',
	description: 'Stats about the bot!',
	permNeeded: null,
	params: []
};