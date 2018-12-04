const Discord = require('discord.js');
const config  = require('../config/index');

class Client extends Discord.Client {
	constructor(database) {
		super({
			disabledEvents: [
				'GUILD_ROLE_CREATE',
				'GUILD_ROLE_DELETE',
				'GUILD_ROLE_UPDATE',
				'CHANNEL_DELETE',
				'USER_NOTE_UPDATE',
				'TYPING_START'
			],
		});

		// Events
		require('./events/handler')(this, database);

		// Message commands
		require('./commands/handler')(this);

		// Every guild is stored with their specific songs
		this.musicQueue = {}
	}

	/*
		Some helpful methods
	 */

	// Seach for guild channel
	getGuildChannel(query, guild) {
		if (query.indexOf("<#") === 0)
			var channel = guild.channels.get(query.substring(2, query.length - 1));
		else
			var channel = guild.channels.find('name', query);

		return new Promise((resolve, reject) => {
			if (channel) resolve(channel);
			else reject(`Couldn't find channel`);
		});
	}

	// Search for guild member
	getGuildMember(query, guild) {
		let member = false;

		if(!isNaN(query)) {
			member = guild.members.get(query);
		} else if (query.indexOf("<@") === 0) {
			member = guild.members.get(query.substring(2, query.length - 1));
		} else {
			if(query.indexOf("@") === 0)
				query = query.slice(1);
			member = guild.members.find(mem => mem.user.username === query);
		}

		return new Promise((resolve, reject) => {
			if (member) resolve(member);
			else reject(`Couldn't find member`);
		});
	}

	// Search for guild role
	getGuildRole(query, guild) {
		let role = false;

		if (!isNaN(query))
			role = guild.roles.get(query);
		else
			role = guild.roles.find('name', query);

		return new Promise((resolve, reject) => {
			if (role) resolve(role);
			else reject(`Couldn't find role`);
		});
	}

	// Search for user
	getUser(query) {
		if(!isNaN(query)) {
			var user = this.users.get(query);
		} else if (query.indexOf("<@") === 0) {
			var user = this.users.get(query.substring(2, query.length - 1));
		} else {
			if (query.indexOf("@") === 0)
				query = query.slice(1);
			var user = this.users.find("username", query);
		}

		return new Promise((resolve, reject) => {
			if (user) resolve(user);
			else reject(`Couldn't find user`);
		});
	}

	// Simple login
	login() {
		return super.login(config.discord.token);
	}
}

module.exports.Client = Client;