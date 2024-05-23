import { PrismaClient } from '@prisma/client';
import { InvoiceDTO } from './dto';

const prisma = new PrismaClient();

export class InvoiceRepository {
    async find({ clientNumber, referenceMonth }: any): Promise<any> {
        return await prisma.Invoice.findMany({
            where: {
                clientNumber: clientNumber ?? undefined,
                referenceMonth: referenceMonth ?? undefined,
            },
        });
    }
    async extractPdf(data: InvoiceDTO): Promise<any> {
        return await prisma.Invoice.create({
            data,
        });
    }
}
