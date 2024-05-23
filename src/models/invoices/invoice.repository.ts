import { PrismaClient } from '@prisma/client';
import { InvoiceDTO } from './dto';

const prisma = new PrismaClient();

export class InvoiceRepository {
    async find({ clientNumber, referenceMonth }: any): Promise<any> {
        return await prisma.Invoice.findMany({
            where: {
                clientNumber: clientNumber ? parseInt(clientNumber) : undefined,
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
    async dashboard(body: any): Promise<any> {
        const { clientNumber } = body;

        const aggregatedData = await prisma.invoice.groupBy({
            by: ['referenceMonth'],
            where: {
                clientNumber: clientNumber ?? undefined,
            },
            _sum: {
                energyElectricQuantity: true,
                energyElectricValue: true,
                energySCEQuantity: true,
                energySCEValue: true,
                energyCompensatedQuantity: true,
                energyCompensatedValue: true,
                publicLightingContributionValue: true,
            },
            orderBy: {
                referenceMonth: 'asc',
            },
        });

        const formattedData = aggregatedData.map((item: any) => ({
            referenceMonth: item.referenceMonth,
            consumptionElectricEnergyKWh:
                item._sum.energyElectricQuantity + item._sum.energySCEQuantity,
            compensatedEnergyKWh: item._sum.energyCompensatedQuantity,
            totalValueWithoutGD:
                item._sum.energyElectricValue +
                item._sum.energySCEValue +
                item._sum.publicLightingContributionValue,
            gdEconomyValue: item._sum.energyCompensatedValue,
        }));

        return formattedData;
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
