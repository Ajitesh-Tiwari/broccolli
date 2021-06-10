import MongoClient from 'mongodb';
import { GenericCallback } from '../utilities/helpers';

export class DB {
	public uri: string;
	public dbName: string;
	public collectionName: string;

	public dbclient: MongoClient.MongoClient;

	constructor(uri: string, dbName: string, collectionName: string) {
		this.uri = uri;
		this.dbName = dbName;
		this.collectionName = collectionName;

		try {
			MongoClient.connect(this.uri, { useNewUrlParser: true, useUnifiedTopology: true }).then((v) => {
				this.dbclient = v;
				this.createCollection().catch((e) => {
					console.log(e);
				});
			});
		} catch (e) {
			console.log(e);
		}
	}

	public async createCollection() {
		const db = this.dbclient.db(this.dbName);
		try {
			await db.createCollection(this.collectionName);
			console.log('Collection created');
		} catch (err) {
			console.log(`Collection err: ${err}`);
		}
	}

	public putToCollection(obj: object, callback: GenericCallback<any>) {
		try {
			this.dbclient.db(this.dbName).collection(this.collectionName).insertOne(obj, (err, res) => {
				callback(err, res);
			});
		} catch (e) {
			callback(Error("Something isn't working currently."), "")
		}
	}

	public async getValueFromCollection(id: string, callback: GenericCallback<any>) {
		try {
			this.dbclient.db(this.dbName).collection(this.collectionName).findOne({ _id: id }, (err, res) => {
				callback(err, res);
			});
		} catch (e) {
			callback(Error("Something isn't working currently."), "")
		}
	}

	public close() {
		this.dbclient.close();
	}
}
