const fs   = require('fs');
const path = require('path');

function loadCommand(bot, file) {
	let command = require(path.join(__dirname, file));
	bot.commands.set(file.slice(0, -3), command);
}

module.exports = (bot) => {
	bot.commands = new Map();

	let files = fs.readdirSync(__dirname);
	for (let file of files) {
		if (file !== path.basename(__filename)) {
			loadCommand(bot, file);
		}
	}
};