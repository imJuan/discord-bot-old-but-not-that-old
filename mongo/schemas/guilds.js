const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
	_id: String,
	members: [require('./guildMember')],
	notifications: require("./guildNotifications"),
	default_role: String
});
