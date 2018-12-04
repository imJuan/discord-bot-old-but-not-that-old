const {RichEmbed} = require('discord.js');
const {formatDate} = require('../../lib/dates');

module.exports = {
	run: (bot, db, guildDoc, msg, cmdParams) => {
		let query = cmdParams.join(' ').trim();

		bot.getUser(query)
		.then(user => {
			let useDoc = (doc=false) => {
				let embed = new RichEmbed()
				.setDescription(`**${user.username}** #${user.discriminator}`)
				.setThumbnail(user.avatarURL || user.defaultAvatarURL)
				.setColor('#32ff32')
				.addField('Created', formatDate(user.createdAt), true)
				.addField('ID', user.id, true)
				.addField('Playing', user.presence.game || '-', true)
				.addField('Status', user.presence.status, true)
				.addField('Last login', (doc === false ? 'N/A' : formatDate(doc.last_login)), true);

				msg.channel.send({embed});
			};

			db.users.findById(user.id).exec()
			.then(userDoc => {
				if (!userDoc) useDoc();
				else useDoc(userDoc);
			});
		})
		.catch(err => msg.reply(`Couldn't find user`));
	},
	type: 'Public',
	category: 'Utility',
	description: 'Get details of an user',
	permNeeded: null,
	params: []
};