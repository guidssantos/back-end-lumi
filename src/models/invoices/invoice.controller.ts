import { Request, Response } from 'express';
import { InvoiceRepository } from './invoice.repository';
import { InvoiceService } from './invoice.service';

const invoiceRepository = new InvoiceRepository();
const invoiceService = new InvoiceService();

export class InvoiceController {
    async find(request: Request, response: Response) {
        const content = await invoiceService.find(invoiceRepository);

        return response.status(content.length === 0 ? 204 : 200).json({ content: content });
    }
    async extractPdf(request: Request, response: Response) {
        const content = await invoiceService.extractPdf(request.body, invoiceRepository);

        return response.status(200).json({ content: content });
    }
}
