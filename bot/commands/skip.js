module.exports = {
	run: (bot, db, guildDoc, msg, cmdParams) => {
		let voiceConnection = msg.guild.voiceConnection;

		if (bot.musicQueue.hasOwnProperty(msg.guild.id)) {
			if (bot.musicQueue[msg.guild.id].items.length <= 0)
				return msg.reply(`There aren't any more songs to play`);
		}

		try {
			voiceConnection.dispatcher.end();
		} catch (err) {
			msg.reply(`Can't skip songs right now`);
		}
	},
	type: 'Public',
	category: 'Music',
	description: 'Skips current song',
	permNeeded: 'CONNECT',
	params: [
		{
			name: 'queueNumber',
			optional: true,
			description: 'Song queue number to skip',
			default: null
		}
	]
};