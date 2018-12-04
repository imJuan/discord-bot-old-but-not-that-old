const unirest     = require('unirest');
const url         = require('url');
const truncate    = require('truncate');
const {google}    = require('../../config/index');
const {RichEmbed} = require('discord.js');

module.exports = {
	run: (bot, db, guildDoc, msg, cmdParams) => {
		let q = cmdParams.join(' ');
		if (!q) return msg.reply('You must search for something');

		let addToQueue = (item => {
			if (!bot.musicQueue.hasOwnProperty(msg.guild.id)) {
				bot.musicQueue[msg.guild.id]         = {};
				bot.musicQueue[msg.guild.id].items   = [];
				bot.musicQueue[msg.guild.id].playing = {};
			}

			if (bot.musicQueue[msg.guild.id].items.length >= 20)
				return msg.reply(`Queue is full at the moment. Try again later.`);

			bot.musicQueue[msg.guild.id].items.push(item);

			let embed = new RichEmbed()
			.setTitle(item.snippet.title)
			.setColor('#01f400')
			.setThumbnail(item.snippet.thumbnails.high.url)
			.setFooter(`Added by ${msg.author.tag} | Queue #${bot.musicQueue[msg.guild.id].items.length}`)
			.setDescription(truncate(item.snippet.description, 100));

			msg.channel.send({embed: embed});

			// Start playing if in voice channel
			if (msg.member.voiceChannel) {
				bot.commands.get('play').run(bot, db, guildDoc, msg, cmdParams);
			}
		});

		// Check if its a link
		if (q.includes('youtube.com')) {
			let videoId = url.parse(q, true).query.v;

			unirest.get(`https://www.googleapis.com/youtube/v3/videos`)
			.query('part=snippet,id')
			.query(`id=${videoId}`)
			.query(`key=${google.apiKey}`)
			.header('Accept', 'application/json')
			.end(res => {
				if (res.error.message) {
					console.error(res.error.message);
					return msg.reply(`Error connecting to server`);
				}

				let result = res.body.items[0];
				if (result) {
					addToQueue(result);
				} else {
					return msg.reply(`Invalid youtube link.`);
				}
			});
		} else {
			unirest.get(`https://www.googleapis.com/youtube/v3/search`)
			.query('part=snippet')
			.query('maxResults=1')
			.query('type=video')
			.query(`q=${encodeURIComponent(q)}`)
			.query(`key=${google.apiKey}`)
			.header('Accept', 'application/json')
			.end(res => {
				if (res.error.message) {
					console.error(res.error.message);
					return msg.reply(`Error connecting to server`);
				}

				let result = res.body.items[0];
				if (result) {
					addToQueue(result);
				} else {
					return msg.reply(`No results found for \`${q}\``);
				}
			});
		}

		msg.delete();
	},
	type: 'Public',
	category: 'Music',
	description: 'Add video to music queue',
	permNeeded: null,
	params: [
		{
			name: 'query',
			optional: false,
			description: 'Query term to search for or the youtube video link',
			default: null
		}
	]
};