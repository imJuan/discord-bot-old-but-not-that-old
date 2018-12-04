module.exports = (...[bot, db, guild]) => {
	db.guilds.findById(guild.id).exec()
	.then(doc => {
		if (!doc) require('../../mongo/lib/createGuild')(bot, db, guild.id);
	});
};
