module.exports = (...[bot, db, oldMember, newMember]) => {
	// Member OFFLINE
	if (oldMember.presence.status !== 'offline' && newMember.presence.status === 'offline') {
		// todo: offline notification
	}

	// Member ONLINE
	if (oldMember.presence.status !== 'online' && newMember.presence.status === 'online') {
		// todo: online notification

		// Update user last login date in mongo
		db.users.findById(newMember.id).exec()
		.catch(err => console.error(err))
		.then(doc => {
			if (!doc) return require('../../mongo/lib/createUser')(bot, db, newMember.id);
			doc.last_login = new Date();
			doc.save();
		});
	}
};