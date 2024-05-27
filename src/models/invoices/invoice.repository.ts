import { PrismaClient } from '@prisma/client';
import { InvoiceDTO } from './dto';

const prisma = new PrismaClient();

export class InvoiceRepository {
    async find({ clientNumber, referenceMonth }: any): Promise<any> {
        return await prisma.invoice.findMany({
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
    async dashboardGraph(body: any): Promise<any> {
        const { clientNumber } = body;

        const aggregatedData = await prisma.invoice.groupBy({
            by: ['referenceMonth'],
            where: {
                clientNumber: clientNumber ? parseInt(clientNumber) : undefined,
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
                (item._sum.energyElectricQuantity ?? 0) + (item._sum.energySCEQuantity ?? 0),
            totalValueWithoutGD:
                (item._sum.energyElectricValue ?? 0) +
                (item._sum.energySCEValue ?? 0) +
                (item._sum.publicLightingContributionValue ?? 0),
        }));

        return formattedData;
    }
    async dashboard(body: any): Promise<any> {
        const { clientNumber } = body;
        const totalData = await prisma.invoice.aggregate({
            where: {
                clientNumber: clientNumber ? parseInt(clientNumber) : undefined,
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
        });

        const summaryData = {
            consumptionElectricEnergyKWh:
                (totalData._sum.energyElectricQuantity ?? 0) +
                (totalData._sum.energySCEQuantity ?? 0),
            compensatedEnergyKWh: totalData._sum.energyCompensatedQuantity ?? 0,
            totalValueWithoutGD:
                (totalData._sum.energyElectricValue ?? 0) +
                (totalData._sum.energySCEValue ?? 0) +
                (totalData._sum.publicLightingContributionValue ?? 0),
            gdEconomyValue: totalData._sum.energyCompensatedValue ?? 0,
        };

        return summaryData;
    }
    async download({ id }: any): Promise<any> {
        const invoice = await prisma.invoice.findUnique({
            where: {
                id: id,
            },

            select: {
                pdfBuffer: true,
            },
        });
        if (invoice && invoice.pdfBuffer) {
            return Buffer.from(invoice.pdfBuffer, 'base64');
        } else {
            return null;
        }
    }
    async extractPdf({ data }: any): Promise<any> {
        return await prisma.invoice.create({
            data,
        });
    }
}
