module.exports = (req, res) => {
	res.status(404);
	//if(req.headers.accept.indexOf('html'))
	//res.render('404', { url: req.protocol + '://' + req.get('host') + req.originalUrl });
	//else
	res.send("URL cannot found")
};