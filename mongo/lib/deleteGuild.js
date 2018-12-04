module.exports = (bot, db, guildID) => {
	db.guilds.findOneAndRemove({_id: guildID}).exec()
	.catch(err => console.log(err))
	.then(doc => {
		if (doc) console.log(`Deleted guild (${doc._id}) from mongo`);
		else console.log(`No guild (${guildID}) was deleted from mongo`)
	});
};