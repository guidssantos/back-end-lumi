import express, { Application } from 'express';
import { router } from './routes';
import { configDotenv } from 'dotenv';

configDotenv();

const PORT = process.env.API_PORT;

const server: Application = express();
server.use(router);

server.listen(PORT, () => console.log(`Server running at port ${PORT}...`));

export default server;
