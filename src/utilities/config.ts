import * as dotenv from 'dotenv';
import path from 'path';
import { DB } from '../modules/db';

dotenv.config({ path: path.join(__dirname, '../.env') });
const db = new DB(process.env.DB_SRV, process.env.DB_NAME, process.env.COLLECTION_NAME);
export const config = {
	DB: db
};
