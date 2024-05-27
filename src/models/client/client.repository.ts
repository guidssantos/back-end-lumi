import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class ClientRepository {
    async findClientNumber() {
        return await prisma.invoice.findMany({
            select: {
                clientNumber: true,
            },
            distinct: ['clientNumber'],
        });
    }
}
