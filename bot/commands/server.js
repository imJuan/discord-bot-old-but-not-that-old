const {RichEmbed} = require('discord.js');
const {formatDate} = require('../../lib/dates');

module.exports = {
	run: (bot, db, guildDoc, msg, cmdParams) => {
		if (!msg.guild.available) return msg.reply(`Guild isn't available at this time`);

		let embed = new RichEmbed()
		.setThumbnail(msg.guild.iconURL)
		.setColor('#01f400')
		.setDescription(`**${msg.guild.name}** (${msg.guild.id})`)
		.setFooter(`Created: ${formatDate(msg.guild.createdAt)}`)
		.addField('Members', `Total: ${msg.guild.memberCount}\nOwner: ${msg.guild.owner.user.tag}`, true)
		.addField('Channels', `Total: ${msg.guild.channels.size}\nDefault: ${msg.guild.defaultChannel.toString()}\nAFK: <#${msg.guild.afkChannelID}>`, true);

		return msg.channel.send({embed});
	},
	type: 'Public',
	category: 'Util',
	description: 'Get server details',
	permNeeded: null,
	params: []
};