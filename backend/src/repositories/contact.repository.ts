import { IContact } from '../models/Contact';

export class ContactRepository {
  private contacts: IContact[] = [];

  async save(contact: IContact): Promise<IContact> {
    const newContact: IContact = {
      ...contact,
      id: (this.contacts.length + 1).toString(),
      createdAt: new Date(),
    };
    this.contacts.push(newContact);
    return newContact;
  }

  async findAll(): Promise<IContact[]> {
    return this.contacts;
  }
}
