import { Router } from 'express';
import { routeAdapter } from '../../utils/routerAdapter';
import { ClientController } from './client.controller';

const clientRouter = Router();
const clientController = new ClientController();

clientRouter.get('/', routeAdapter(clientController.findClientNumber));

export { clientRouter };
