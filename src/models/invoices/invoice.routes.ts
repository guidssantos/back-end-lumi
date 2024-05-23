import { Router } from 'express';
import { routeAdapter } from '../../utils/routerAdapter';
import { InvoiceController } from './invoice.controller';

const invoiceRouter = Router();
const invoiceController = new InvoiceController();

invoiceRouter.get('/', routeAdapter(invoiceController.find));
invoiceRouter.get('/dashboard', routeAdapter(invoiceController.dashboard));
invoiceRouter.get('/download/:id', routeAdapter(invoiceController.download));
invoiceRouter.post('/', routeAdapter(invoiceController.extractPdf));

export { invoiceRouter };
