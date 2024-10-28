import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import constants from './constants';
import { Relay } from './Relay';
import { MongoClient } from 'mongodb';
import { PRKTLRequest } from './types';
import { convertRequest } from './utils';

const bp = constants.BASE_PATH;
const port = process.env.PRKTL_SERVER_PORT || 3000;
const app = express();

const createRelay = async () => {
	const client = new MongoClient(process.env.PRKTL_MONGO_URL, {
		auth: {
			username: process.env.PRKTL_MONGO_USERNAME,
			password: process.env.PRKTL_MONGO_PASSWORD
		}
	});
	
	await client.connect();
	return new Relay(client.db(process.env.PRKTL_MONGO_DATABASE));
}

const start = async () => {
	const relay = await createRelay();
	
	app.use(bodyParser.json());

	app.use((req: Request, res: Response, next: NextFunction) => {
		req = convertRequest(req);
		next();
	});

	app.use((req: Request, res: Response, next: NextFunction) => {
		next();
	});
	
	app.get(`${bp}/space/:sid`, async (req: PRKTLRequest, res) => res.send(await relay.getSpace(req.params.sid)));
	app.get(`${bp}/space`, async (req: PRKTLRequest, res) => res.send(await relay.getSpaces(req.searchOptions)));
	app.post(`${bp}/space`, async (req: PRKTLRequest , res) => res.send(await relay.createSpace(req.body)));

	app.listen(port, () => console.log(`PRKTL server is listening on port ${port}`));
}

start();
