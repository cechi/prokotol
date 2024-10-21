import express, { Request, Response } from 'express';
import userRoutes from './routes/users';
import messageRoutes from './routes/messages';

const app = express();
const port = process.env.PRKTL_SERVER_PORT || 3000;

userRoutes(app);
messageRoutes(app);

app.listen(port, () => {
	console.log(`PRKTL server is listening on port ${port}`);
});
