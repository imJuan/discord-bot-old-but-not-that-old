const now = require('performance-now');

module.exports = {
    run: (bot, db, guildDoc, msg, cmdParams) => {
		let start = now();
		msg.channel.send("Ping Pong!")
		.then(message => {
			let end = now();
			return message.edit(`Ping took ${(end - start).toFixed(3)} ms.`);
		});
	},
	type: 'Public',
	category: 'Client',
	description: 'Ping pong!',
	permNeeded: null,
	params: []
};