const express = require('express');
const router  = express.Router();

router.get('/', (req, res) => {
	res.render('../views/pages/index', {
		title: 'Home',
		pageId: 'index',
		bot: req.bot
	});
});

module.exports = router;