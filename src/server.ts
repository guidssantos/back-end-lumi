import express, {Application} from 'express'
import { router } from './routes';

const PORT = 8080

const server: Application = express();
server.use(router);

server.listen(PORT, () => console.log(`Server running at port ${PORT}...`));

export default server;