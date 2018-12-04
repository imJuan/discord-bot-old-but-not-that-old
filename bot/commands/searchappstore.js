const unirest      = require('unirest');
const {RichEmbed}  = require('discord.js');
const truncate     = require('truncate');
const {formatDate} = require('../../lib/dates');
const {getRandom}  = require('../../lib/random');

function getStarRating(rating) {
	if (!rating) return 'No Customer Ratings';

	let starRating = '';

	for (let i = 0; i < rating; i++) {
		starRating += ':star:';
	}

	return starRating;
}

module.exports = {
	run: (bot, db, guildDoc, msg, cmdParams) => {
		let query = cmdParams.join(' ').toString();

		if (!query)
			return msg.reply('You must search for something');

		unirest.get('https://itunes.apple.com/search')
		.query({
			term: query,
			country: 'us',
			entity: 'software',
			limit: 1,
			lang: 'en_us'
		})
		.headers({
			'Accept': 'application/json'
		})
		.end(res => {
			if (res.code === 200) {
				let body = JSON.parse(res.body);

				if (body.resultCount > 0) {
					let item  = body.results[0];
					let embed = new RichEmbed()
					.setAuthor(item.sellerName, '', item.artistViewUrl)
					.setTitle(`${item.trackName} | v${item.version}  |  ${item.formattedPrice}`)
					.setURL(item.trackViewUrl)
					.setThumbnail(item.artworkUrl512)
					.setImage(item.screenshotUrls[getRandom(0, item.screenshotUrls.length)])
					.setColor('#32ff32')
					.addField('Min OS Version', item.minimumOsVersion, true)
					.addField('Rating', `${getStarRating(item.averageUserRating)} out of ${item.userRatingCount} ratings`, true)
					.addField('Latest Version', `${item.version} | ${formatDate(new Date(item.currentVersionReleaseDate))}\n${truncate(item.releaseNotes, 300)}`, false)
					.setDescription(truncate(item.description, 300))
					.setFooter(`Release Date: ${formatDate(new Date(item.releaseDate))}`);

					return msg.channel.send({embed});
				}
			}

			return msg.reply(`No results`);
		});
	},
	type: 'Public',
	category: 'Apple',
	description: 'Search for an application from iTunes',
	permNeeded: null,
	params: []
};