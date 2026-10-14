import { ContactRepository, contactRepository } from '../repositories/contact.repository';
import { IContact } from '../models/Contact';

export class ContactService {
  private contactRepo: ContactRepository;

  constructor() {
    this.contactRepo = contactRepository;
  }

  async processContactSubmission(data: IContact): Promise<{ success: boolean; message: string; contact?: IContact }> {
    if (!data.name || !data.email || !data.message) {
      throw new Error('All fields (name, email, message) are required.');
    }

    const saved = await this.contactRepo.save(data);
    return {
      success: true,
      message: 'Thank you for reaching out to Crefto. We will contact you soon!',
      contact: saved,
    };
  }

  async getAllContacts(): Promise<IContact[]> {
    return this.contactRepo.findAll();
  }
}
