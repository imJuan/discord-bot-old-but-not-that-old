module.exports = (...[bot, db, member]) => {
	// Remove user from guild members
	//db.guilds.findById(member.guild.id).exec()
	//.then(doc => {
	//	if (!doc) return;
	//	if (!doc.members.id(member.user.id)) {
	//		require('../../mongo/lib/deleteMember')(bot, doc, member.user.id);
	//	}
	//});

	// Remove user from database
	//require('../../mongo/lib/deleteUser')(bot, db, member.user.id);
};