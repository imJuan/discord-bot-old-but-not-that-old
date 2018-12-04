module.exports = {
	run: (bot, db, guildDoc, msg, cmdParams) => {
		const voiceChannel = msg.member.voiceChannel;

		if (voiceChannel) {
			voiceChannel.join()
			.then(() => {
				//msg.reply(`I've connected to ${voiceChannel.name}!`);
			})
			.catch(err => {
				console.log(err);
				msg.reply(`Something went wrong when joining channel... ${err.message}`);
			});
		} else {
			msg.reply('You must join a voice channel first');
		}
	},
	type: 'Public',
	category: 'Music',
	description: 'Joins the current voice channel.',
	permNeeded: 'CONNECT',
	params: []
};