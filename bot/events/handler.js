module.exports = (bot, db) => {
	let loadEvent = (event, ...args) => {
		try {
			require(`./${event}`)(...args);
		} catch(ex) {
			console.log(ex);
		}
	};

	bot.on('ready', () => loadEvent('ready', bot, db));
	bot.on('message', (msg) => loadEvent('message', bot, db, msg));
	bot.on('guildCreate', (guild) => loadEvent('guildCreate', bot, db, guild));
	bot.on('guildDelete', (guild) => loadEvent('guildDelete', bot, db, guild));
	bot.on('presenceUpdate', (oldMember, newMember) => loadEvent('presenceUpdate', bot, db, oldMember, newMember));
	bot.on('guildMemberAdd', (member) => loadEvent('guildMemberAdd', bot, db, member));
	bot.on('guildMemberRemove', (member) => loadEvent('guildMemberRemove', bot, db, member));
};
