import MongoClient from 'mongodb';
import { config } from '../utilities/config';

export let dbs = {
	async connect() {
		const uri = config.DB_SRV;
		const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
		const db = client.db('sampledb');
		try {
			const result = await db.createCollection('samplecollection');
			console.log(result);
		} catch (err) {
			console.log(err);
		}
		// perform actions on the collection object
		client.close();
	}
};
