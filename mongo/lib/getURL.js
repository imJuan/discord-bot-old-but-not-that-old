module.exports = () => {
	let mongoURL = '';

	if (process.env.DATABASE_SERVICE_NAME) {
		let mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase(),
		    mongoHost        = process.env[mongoServiceName + '_SERVICE_HOST'],
		    mongoPort        = process.env[mongoServiceName + '_SERVICE_PORT'],
		    mongoDatabase    = process.env[mongoServiceName + '_DATABASE'],
		    mongoPassword    = process.env[mongoServiceName + '_PASSWORD'],
		    mongoUser        = process.env[mongoServiceName + '_USER'];

		if (mongoHost && mongoPort && mongoDatabase) {
			mongoURL = 'mongodb://';

			if (mongoUser && mongoPassword)
				mongoURL += mongoUser + ':' + mongoPassword + '@';

			mongoURL += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
		}
	} else {
		mongoURL = 'mongodb://localhost:27017/bot';
	}

	return mongoURL;
};