import { Request, Response } from 'express';
import { InvoiceRepository } from './invoice.repository';
import { InvoiceService } from './invoice.service';

const invoiceRepository = new InvoiceRepository();
const invoiceService = new InvoiceService();

export class InvoiceController {
    async find(request: Request, response: Response) {
        const content = await invoiceService.find(request.query, invoiceRepository);

        return response.status(content?.length === 0 ? 204 : 200)?.json(content);
    }
    async dashboard(request: Request, response: Response) {
        const content = await invoiceService.dashboard(request.query, invoiceRepository);

        return response.status(content?.length === 0 ? 204 : 200)?.json(content);
    }
    async dashboardGraph(request: Request, response: Response) {
        const content = await invoiceService.dashboardGraph(request.query, invoiceRepository);

        return response.status(content?.length === 0 ? 204 : 200)?.json(content);
    }
    async download(request: Request, response: Response) {
        const content = await invoiceService.download(request.params, invoiceRepository);

        response.setHeader('Content-Type', 'application/pdf');
        response.setHeader(
            'Content-Disposition',
            `attachment; filename=invoice_${request.params.id}.pdf`
        );

        return response.status(200).send(content);
    }
    async extractPdf(request: Request, response: Response) {
        const content = await invoiceService.extractPdf(request.body, invoiceRepository);

        return response.status(200).json(content);
    }
}
