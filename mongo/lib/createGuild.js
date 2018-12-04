module.exports = (bot, db, guildID) => {
	db.guilds.create(new db.guilds({_id: guildID}))
	.catch(err => console.log(err))
	.then(doc => {
		if (doc) console.log(`Added guild (${guildID}) to mongo`);
		else console.log(`No doc added for guild ${guildID}`);
	});
};