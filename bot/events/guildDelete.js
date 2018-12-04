module.exports = (...[bot, db, guild]) => {
	require('../../mongo/lib/deleteGuild')(bot, db, guild.id);
};