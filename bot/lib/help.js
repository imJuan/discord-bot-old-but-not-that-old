// Command function is in here
// because the help command wouldn't
// display itself inside command help list

// todo: rewrite, this is really messy

const {RichEmbed} = require('discord.js');
const config      = require('../../config/index');

function formatParams(cmd) {
	let params = '';

	for (let i = 0; i < cmd.params.length; i++) {
		let defaultValue = cmd.params[i].default !== null ? `=${cmd.params[i].default}` : ``;
		if (cmd.params[i].optional) params += `[${cmd.params[i].name}${defaultValue}]`;
		else params += cmd.params[i].name + defaultValue;
		params += ` - ${cmd.params[i].description}\n`;
	}

	return params;
}

function getCommandsByType(bot, type) {
	let commands = '';
	bot.commands.forEach((cmd, name) => {
		if (cmd.type === type)
			commands += `\`${name}\` - ${cmd.description}\n`;
	});
	return commands;
}

function getCommandsByCat(bot, cat) {
	let commands = '';
	bot.commands.forEach((cmd, name) => {
		if (cmd.category.toLowerCase().includes(cat.toLowerCase()))
			commands += `\`${name}\` - ${cmd.description}\n`;
	});
	return commands;
}

module.exports = (bot, db, guildDoc, msg, cmdParams) => {
	let embed = new RichEmbed()
	.setColor('#0096ff');

	// Check what user is requesting help for
	let name = cmdParams.join(' ').trim();
	if (name) {
		// Check if its a command
		let cmd = bot.commands.get(name);
		if (cmd) {
			embed
			.setAuthor(`Command '${name}'`, '', config.homePage)
			.setDescription(cmd.description)
			.addField('Category', cmd.category, true)
			.addField('Type', (cmd.type === null ? 'No Pref.' : cmd.type), true)
			.addField('Permission needed', (cmd.permNeeded === null ? 'None' : cmd.permNeeded), true);

			// Format parameters
			if (cmd.params.length > 0) {
				embed.addField('Parameters', formatParams(cmd), false);
			}

			msg.channel.send({embed});
		} else {
			// Not a specific command
			// Check if its for a certain type of command
			if (name.toLowerCase() === 'public') {
				let commands = getCommandsByType(bot, 'Public');
				embed.addField('Public', commands, false);
				msg.channel.send({embed});
			} else if (name.toLowerCase() === 'private') {
				let commands = getCommandsByType(bot, 'Private');
				embed.addField('Private', commands, false);
				msg.channel.send({embed});
			} else {
				// Not looking for type
				// Now search categories
				let commands = getCommandsByCat(bot, name);
				if (commands) {
					embed.addField(`'${name}' commands`, commands, false);
					msg.channel.send({embed});
				} else {
					embed.setColor('#ff3232').setDescription(`Couldn't find any info for \`${name}\``);
					msg.reply({embed});
				}
			}
		}
	} else {
		// Get list of all commands
		let publicCommands  = '';
		let privateCommands = '';
		let commands        = '';

		bot.commands.forEach((cmd, name) => {
			let desc = `\`${name}\` - ${cmd.description}\n`;
			if (cmd.type === 'Public')
				publicCommands += desc;
			else if (cmd.type === 'Private')
				privateCommands += desc;
			else
				commands += desc;
		});

		embed
		.setAuthor('Commands', '', config.homePage)
		.addField('No Pref.', commands, false)
		.addField('Public', publicCommands, false)
		.addField('Private', privateCommands, false)
		.setFooter(`TIP: Try '${config.discord.prefix}help (query)' to search commands for a category, type, or specific command`);

		msg.channel.send({embed});
	}
};