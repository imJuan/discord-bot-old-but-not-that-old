const {discord} = require('../../config/index');
const config = require('../../config/index');

function changeGame(bot, count) {
	if (count >= discord.games.length) count = 0;
	bot.user.setGame(discord.games[count]);
	setTimeout(() => {
		changeGame(bot, ++count);
	}, 20000);
}

module.exports = (...[bot, db]) => {
	console.log('Bot is ready!');
	changeGame(bot, 0);
	
	// todo: check if all guilds exist in mongo
};
