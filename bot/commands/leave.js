
module.exports = {
	run: (bot, db, guildDoc, msg, cmdParams) => {
		try {
			msg.guild.voiceConnection.dispatcher.end('Leaving channel');
			msg.guild.voiceConnection.channel.leave();
		} catch (err) {}
	},
	type: 'Public',
	category: 'Music',
	description: 'Leaves the current voice channel.',
	permNeeded: 'CONNECT',
	params: []
};