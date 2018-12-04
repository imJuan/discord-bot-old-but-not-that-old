const config = require('../config/index');

// Remove anything that is private
function privateKeys(str) {
	let reg = new RegExp(`${config.pathBase}|${config.discord.token}|${config.mongo.url}|${config.google.apiKey}`, 'g');
	return str.replace(reg, '[PRIVATE]');
}

module.exports = {
	privateKeys
};