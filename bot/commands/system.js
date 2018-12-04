const os          = require('os');
const {execSync}  = require('child_process');
const {RichEmbed} = require('discord.js');
const dates       = require('../../lib/dates');

module.exports = {
	run: (bot, db, guildDoc, msg, cmdParams) => {
		let embed = new RichEmbed()
		.setDescription(`**System Info**`)
		.setColor('#32ff32')
		.addField('Node.js Version', process.version.replace('v', ''), true)
		.addField('NPM Version', execSync('npm --version').toString().replace(os.EOL, ''), true)
		.addField('OS Type', os.type(), true)
		.addField('OS Platform', os.platform(), true)
		.addField('OS Architecture', os.arch(), true)
		.addField('OS Release', os.release(), true)
		.addField('CPU Cores', os.cpus().length, true)
		.addField('Node Environment', process.env.NODE_ENV, true)
		.addField('Free Memory', `${Math.round(os.freemem() / 1048576)}MB`, true)
		.addField('Uptime', dates.secondsToHms(os.uptime()), true)

		msg.channel.send({embed});
	},
	type: 'Public',
	category: 'System',
	description: 'Get system information',
	permNeeded: null,
	params: []
};