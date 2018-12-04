const {discord}   = require('../../config/index');
const {RichEmbed} = require('discord.js');

module.exports = {
	run: (bot, db, guildDoc, msg, cmdParams) => {
		if (discord.clientID) {
			let embed = new RichEmbed()
			.setDescription(`https://discordapp.com/oauth2/authorize?client_id=${discord.clientID}&scope=bot`)
			.setTitle('Bot Invite Link')
			.setColor('#01f400');
			msg.channel.send({embed});
		} else
			msg.reply('No client ID found. Ask bot owner to add one.');
	},
	type: null,
	category: 'Client',
	description: 'Get invite link for bot',
	permNeeded: null,
	params: []
};