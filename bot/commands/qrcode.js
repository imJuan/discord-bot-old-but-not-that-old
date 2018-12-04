const qr   = require('qr-image');
const path = require('path');

module.exports = {
	run: (bot, db, guildDoc, msg, cmdParams) => {
		let text = cmdParams.join(' ').trim();
		if (!text) return msg.reply('You must enter text to encode');
		if (text.length >= 150) return msg.reply(`Your text is to long. Try something shorter.`);

		let image = qr.imageSync(text, {
			type: 'png'
		});

		msg.channel.send({files: [{attachment: image}]})
		.catch(err => {
			console.error(err);
			msg.reply(`Couldn't generate qr image`);
		});
	},
	type: 'Public',
	category: 'Misc.',
	description: 'Generates a QR Code',
	permNeeded: null,
	params: [
		{
			name: 'text',
			optional: false,
			description: 'Text to encode',
			default: null
		}
	]
};