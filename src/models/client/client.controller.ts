import { Request, Response } from 'express';
import { ClientRepository } from './client.repository';
import { ClientService } from './client.service';

const clientRepository = new ClientRepository();
const clientService = new ClientService();

export class ClientController {
    async findClientNumber(request: Request, response: Response) {
        const content = await clientService.findClientNumber(clientRepository);

        return response.status(content.length === 0 ? 204 : 200).json(content);
    }
}
