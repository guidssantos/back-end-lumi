import { Router } from 'express';
import { routeAdapter } from '../../utils/routerAdapter';
import { InvoiceController } from './invoice.controller';

const invoiceRouter = Router();
const invoiceController = new InvoiceController();

invoiceRouter.get('/', routeAdapter(invoiceController.find));

export { invoiceRouter };
