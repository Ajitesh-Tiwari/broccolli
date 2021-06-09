import express from 'express';
import { dbs } from '../modules/db';
import { Secret } from '../modules/secret';
import totp from '../modules/totp';

const router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
	console.log('Time: ', Date.now());
	next();
});

// define the home page route
router.get('/', (req, res) => {
	dbs.connect();
	const secretValue = new Secret().createRandomSecret();
	res.send(totp.generateTotp(secretValue));
});

// define the about route
router.get('/about', (req, res) => {
	res.send('About birds');
});

export = router;
