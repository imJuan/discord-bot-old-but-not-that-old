const express           = require('express');
const router            = express.Router();

router.get('/', (req, res) => {
	res.render('../views/pages/editor', {
		title: 'Editor',
		pageId: 'editor'
	});
});

module.exports = router;