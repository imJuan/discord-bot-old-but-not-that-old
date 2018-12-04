const {RichEmbed} = require('discord.js');
const truncate    = require('truncate');
const {owner}     = require('../../config/index');
const {inspect}   = require('util');
const filer       = require('../../lib/filter');

// todo: Show result of promises

module.exports = {
	run: (bot, db, guildDoc, msg, cmdParams) => {
		if (msg.author.id !== owner.id)
			return msg.reply(`You can't use this command`);

		let channel = msg.channel;
		let input   = cmdParams.join(' ');
		let embed   = new RichEmbed()
		.addField(':inbox_tray: Input', `\`\`\`js\n${truncate(input, 100)}\n\`\`\``, false)
		.setFooter(`Ran by ${msg.author.tag}`);

		msg.delete();

		try {
			let e = eval(input);

			//if (e instanceof Promise) e = update(e, embed);
			if (typeof e !== 'string') e = inspect(e);

			let output = filer.privateKeys(e.toString());

			embed.addField(':outbox_tray: Output', `\`\`\`js\n${truncate(output, 800)}\n\`\`\``, false)
			.setColor('#32ff32');

		} catch (err) {
			embed.addField(':outbox_tray: Output', `\`\`\`Markdown\n${truncate(err.toString(), 800)}\n\`\`\``, false)
			.setColor('#ff3232');
		}

		channel.send({embed});
	},
	type: null,
	category: 'Client',
	description: 'Evaluates the given code. (Restricted to bot owner)',
	permNeeded: null,
	params: [
		{
			name: 'code',
			optional: false,
			description: 'Code to run',
			default: null
		}
	]
};