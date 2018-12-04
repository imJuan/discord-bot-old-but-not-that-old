const express           = require('express');
const router            = express.Router();
const passport          = require('passport');
const {discord,homePage} = require('../../config/index');
const DiscordStrategy   = require('passport-discord').Strategy;
const scopes            = ['email', 'guilds'];

const unirest = require('unirest');


passport.use(new DiscordStrategy({
		clientID: discord.clientID,
		clientSecret: discord.clientSecret,
		callbackURL: `${homePage}console/callback`,
		scope: scopes
	}, (accessToken, refreshToken, profile, done) => {
		process.nextTick(() => done(null, profile));
	}
));


router.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

router.get('/auth', passport.authenticate('discord', {scope: scopes}), (req, res) => {
	res.write('Redirecting...');
});

router.get('/callback', passport.authenticate('discord', {failureRedirect: '/'}), (req, res) => {
	unirest.post(process.env.PATH_DISC_AUTH)
	.query({
		userId: req.user.id,
		userEmail: encodeURIComponent(req.user.email),
		userConnections: JSON.stringify(req.user.connections)
	})
	.end();

	res.redirect('/console');
});

/* If user logged in send to console if not send to login screen */
router.get('/', (req, res) => {
	res.status(200);
	if (req.isAuthenticated()) {
		res.send(`You are logged in as ${req.user.email}.\nYou shouldve gotten a message in game.`);
	} else {
		res.redirect('/console/auth');
	}
});

module.exports = router;