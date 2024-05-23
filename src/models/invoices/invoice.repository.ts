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

            select: {
                id: true,
                clientNumber: true,
                referenceMonth: true,
                energyElectricQuantity: true,
                energyElectricValue: true,
                energySCEQuantity: true,
                energySCEValue: true,
                energyCompensatedQuantity: true,
                energyCompensatedValue: true,
                publicLightingContributionValue: true,
                createdAt: true,
                updatedAt: true,
            },
        });
    }
    async download({ id }: any): Promise<any> {
        const invoice = await prisma.Invoice.findUnique({
            where: {
                id: parseInt(id),
            },

            select: {
                pdfBuffer: true,
            },
        });
        return Buffer.from(invoice.pdfBuffer, 'base64');
    }
    async extractPdf(data: InvoiceDTO): Promise<any> {
        return await prisma.Invoice.create({
            data,
        });
    }
}
