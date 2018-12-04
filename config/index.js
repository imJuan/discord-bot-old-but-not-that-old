// note: add anything private to privateKeys(str) in ../lib/filter.js

module.exports = {
	env: process.env.NODE_ENV,
	isDevelopment: process.env.NODE_ENV === 'development',
	homePage: '',
	pathBase: process.env.PATH_BASE,
	owner: {
		id: '114588340430307332'
	},
	server: {
		ip: process.env.IP || '0.0.0.0',
		port: process.env.PORT || 8080
	},
	mongo: {
		url: require('../mongo/lib/getURL')()
	},
	discord: {
		token: process.env.BOT_TOKEN,
		clientID: process.env.BOT_CLIENT_ID,
		clientSecret: 'TBCYf-cTXxtNZne4XPucB8Z9WeXrTWFt',
		prefix: '>>',
		games: [
			'Type >>help',
			'Created by Juan'
		]
	},
	google: {
		apiKey: process.env.GOOGLE_KEY
	}
};