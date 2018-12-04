const mongoose = require("mongoose");

module.exports = new mongoose.Schema({
	_id: String,
	message_count: Number
});
