const config = require('../../config/index');
const mongoose = require('mongoose');

// todo: if guild doesn't exist in mongo, I need to add it then run the command. As of now it will add but throw error to user. So the first command ever in guild will not work.

module.exports = (...[bot, db, msg]) => {
	if (msg.author.bot || msg.system) return;

	// Message starts with command prefix
	if (msg.content.startsWith(config.discord.prefix)) {
		let content   = msg.content.substr(config.discord.prefix.length);
		let cmdName   = content.split(' ')[0].toLowerCase();
		let cmdParams = content.substring(cmdName.length + 1).split(' ');
		let command   = bot.commands.get(cmdName);
		if (!command) return;

		// Run command with optional guild document
		// not needed for private command
		let runCommand = (doc={}) => {
			try {
				command.run(bot, db, doc, msg, cmdParams);
			} catch (err) {
				console.error(`Error running command ${cmdName}\n${err}`);
				msg.reply(`Error running command, if problems persist contact bot owner.`);
			}
		};

		// whether in guild or dm channel
		if (msg.channel.type === 'text') {
			// Check if private command
			if (command.type === 'Private')
				return msg.reply(`You must message me directly to use this command.`);

			// Check for permission required, if any.
			if (command.permNeeded)
				if (!msg.member.permissions.has(command.permNeeded))
					return msg.reply(`You don't have permission to use this command.`);

			// Get guild document if connected to mongo
			if (mongoose.connection.readyState === 1) {
				db.guilds.findById(msg.guild.id).exec()
				.catch(err => console.log(err))
				.then(doc => {
					if (doc) runCommand(doc);
					else {
						require('../../mongo/lib/createGuild')(bot, db, msg.guild.id);
						msg.reply(`Something went wrong, try again later.`);
					}
				});
			} else {
				runCommand();
			}
		} else if (msg.channel.type === 'dm') {
			// Check if public
			if (command.type === 'Public')
				return msg.reply(`You must be in a guild channel to use this command.`);

			runCommand();
		}
	}
};