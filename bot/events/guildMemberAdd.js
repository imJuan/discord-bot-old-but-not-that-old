module.exports = (...[bot, db, member]) => {
	db.guilds.findById(member.guild.id).exec()
	.then(doc => {
		if (!doc) return;
		if (!doc.members.id(member.user.id)) {
			require('../../mongo/lib/createMember')(bot, doc, member.user.id);
		}
	});

	db.users.findById(member.user.id).exec()
	.then(doc => {
		if (!doc) {
			require('../../mongo/lib/createUser')(bot, db, member.user.id);
		}
	});
};