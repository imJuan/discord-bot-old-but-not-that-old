module.exports = (bot, db, userID) => {
	db.users.create(new db.users({_id: userID}))
	.catch(err => console.log(err))
	.then(doc => {
		if (doc) console.log(`Added user (${userID}) to mongo`);
		else console.log(`No doc added for user ${userID}`);
	});
};