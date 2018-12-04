const mongoose = require('mongoose');

module.exports = new mongoose.Schema({
	_id: String,
	past_names: [String],
	last_login: {type: Date, default: new Date()}
});
