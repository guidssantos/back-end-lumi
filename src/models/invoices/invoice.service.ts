import { InvoiceRepository } from "./invoice.repository";

export class InvoiceService {
    async find (invoiceRepository: InvoiceRepository){
        const invoice = await invoiceRepository.find();
        return invoice
    }
}