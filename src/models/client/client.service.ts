import { ClientRepository } from './client.repository';
export class ClientService {
    async findClientNumber(clientRepository: ClientRepository) {
        const client = await clientRepository.findClientNumber();
        return client;
    }
}
