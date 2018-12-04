module.exports = {
	run: (bot, db, guildDoc, msg, cmdParams) => {
		let limit = cmdParams[0];

		if (limit <= 1 || !limit || isNaN(limit))
			return msg.reply(`You can only delete between 2 - 100 messages`);

		msg.channel.fetchMessages({limit, before: msg.id})
		.then(messages => {
			msg.channel.bulkDelete(messages)
			.then(msg.reply(`Deleted ${limit} messages`));
			msg.delete();
		})
		.catch(err => {
			console.log(err);
			msg.reply(`Couldn't delete messages`);
		});
	},
	type: 'Public',
	category: 'Server',
	description: 'Delete mass number of messages',
	permNeeded: 'MANAGE_MESSAGES',
	params: []
};