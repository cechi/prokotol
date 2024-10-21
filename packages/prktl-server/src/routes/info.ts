import { Express } from 'express';
import constants from '../constants';

export default function (app: Express) {
	app.get(`${constants.BASE_PATH}/info`, (req, res) => {
		res.send({});
	});
}