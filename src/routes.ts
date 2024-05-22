import { Router } from 'express';

import { invoiceRouter } from './models/invoices/invoice.routes';

const router = Router();

router.use('/invoice', invoiceRouter);

export { router };
