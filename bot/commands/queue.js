const {RichEmbed} = require('discord.js');

module.exports = {
	run: (bot, db, guildDoc, msg, cmdParams) => {
		if (!bot.musicQueue.hasOwnProperty(msg.guild.id)) {
			return msg.reply(`Queue is empty`);
		}

		if (bot.musicQueue[msg.guild.id].items.length <= 0) {
			return msg.reply(`Queue is empty`);
		}

		let desc  = '';
		let count = 0;
		for (let item of bot.musicQueue[msg.guild.id].items) {
			desc += `${ ++count}.  ${item.snippet.title}\n`;
		}

		let embed = new RichEmbed()
		.setTitle('Music Queue')
		.setColor('#0096ff')
		.setDescription(desc);

		msg.channel.send({embed: embed});
		msg.delete();
	},
	type: 'Public',
	category: 'Music',
	description: `Shows what is coming up next in queue`,
	permNeeded: null,
	params: []
};