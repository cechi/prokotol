import { Express } from 'express';
import constants from '../constants';

export default function (app: Express) {
	app.get(`${constants.BASE_PATH}/users`, (req, res) => {
		res.send('Hello World!');
	});
}