import express from 'express';
import { DB } from '../modules/db';
import { Secret } from '../modules/secret';
import totp from '../modules/totp';
import { config } from '../utilities/config';
import { GenericCallback, LoginBody, MongoResponseBody, RequestBody } from '../utilities/helpers';

const router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
	console.log('Time: ', Date.now());
	next();
});

// define the home page route
router.post('/', (req, res) => {
	const dbObject = getObject(req.body as RequestBody, new Secret().createRandomSecret());
	putToDB(config.DB, dbObject, (err: Error, response: any) => {
		if (err) {
			console.log(err.message);
			res.send(err.message);
			return;
		}
		res.send(`User ${(req.body as RequestBody).user} created`);
	});
});

router.post('/login', (req, res) => {
	const payload = req.body as LoginBody;
	getValueFromDB(config.DB, payload.user, (err: Error, response: MongoResponseBody) => {
		if (err) {
			res.send(err);
			return;
		}

		if (response == null) {
			res.send('no response');
			return;
		}

		if (payload.otp == totp.generateTotp(response.secret).toString()) {
			res.send('Success');
		} else {
			res.send('Unauthorized');
		}
	});
});

function putToDB(db: DB, obj: any, callback: GenericCallback<any>) {
	db.putToCollection(obj, callback);
}

function getValueFromDB(db: DB, key: string, callback: GenericCallback<MongoResponseBody>) {
	db.getValueFromCollection(key, callback);
}

function getObject(reqBody: RequestBody, secret: string) {
	return {
		_id: reqBody.user,
		secret
	};
}

// define the about route
router.get('/about', (req, res) => {
	res.send('About birds');
});

export = router;
