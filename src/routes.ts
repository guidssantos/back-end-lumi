import { Router } from 'express';

import { invoiceRouter } from './models/invoices/invoice.routes';
import { clientRouter } from './models/client/client.routes';

const router = Router();

router.use('/invoice', invoiceRouter);
router.use('/client', clientRouter);

export { router };
