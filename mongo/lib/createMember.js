module.exports = (bot, doc, userID) => {
	doc.members.push({_id: userID});
	doc.save((err, product, numAffected) => {
		if (err) console.error(`Error save member (${userID}) to guild (${doc._id}):\n${err}`);
		if (numAffected < 0) console.error(`Didn't add member (${userID}) to guild (${doc._id})`);
		else console.log(`Added member (${userID}) to guild (${doc._id})`);
	});
};