import express from 'express';
import { DB } from '../modules/db';
import { Secret } from '../modules/secret';
import totp from '../modules/totp';
import { config } from '../utilities/config';
import { GenericCallback, MongoResponseBody } from '../utilities/helpers';

const router = express.Router();

class RequestBody {
	user: string;
}

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

router.get('/:user/totp', (req, res) => {
	getValueFromDB(config.DB, req.params.user, (err: Error, response: MongoResponseBody) => {
		if (err) {
			res.send(err);
			return;
		}

		if (response == null) {
			res.send('no response');
			return;
		}

		res.send(totp.generateTotp(response.secret));
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
