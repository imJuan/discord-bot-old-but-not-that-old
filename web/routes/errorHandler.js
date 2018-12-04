module.exports = (err, req, res, next) => {
	if (require('../../config/index').isDevelopment) {
		console.error(err);
	}

	res.sendStatus(500);
	//res.render('error', { error: err });
};