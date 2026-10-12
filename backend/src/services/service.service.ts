import { ServiceRepository } from '../repositories/service.repository';
import { IService } from '../models/Service';

export class ServiceService {
  private serviceRepo: ServiceRepository;

  constructor() {
    this.serviceRepo = new ServiceRepository();
  }

  async getAllServices(): Promise<IService[]> {
    return this.serviceRepo.findAll();
  }
}
