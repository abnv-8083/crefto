import { Contact, IContact } from '../models/Contact';
import { isDBConnected } from '../config/db';

export class ContactRepository {
  private inMemoryContacts: IContact[] = [];

  async save(contactData: IContact): Promise<IContact> {
    if (isDBConnected()) {
      try {
        const created = await Contact.create({
          name: contactData.name,
          email: contactData.email,
          message: contactData.message,
          service: contactData.service,
          status: contactData.status || 'new',
        });
        return {
          id: created._id.toString(),
          name: created.name,
          email: created.email,
          message: created.message,
          service: created.service,
          status: created.status,
          createdAt: created.createdAt,
        };
      } catch (err) {
        console.error('[ContactRepository] MongoDB save error, storing in memory fallback:', err);
      }
    }

    // In-memory fallback
    const fallbackContact: IContact = {
      ...contactData,
      id: (this.inMemoryContacts.length + 1).toString(),
      createdAt: new Date(),
    };
    this.inMemoryContacts.push(fallbackContact);
    return fallbackContact;
  }

  async findAll(): Promise<IContact[]> {
    if (isDBConnected()) {
      try {
        const docs = await Contact.find().sort({ createdAt: -1 });
        return docs.map((d) => ({
          id: d._id.toString(),
          name: d.name,
          email: d.email,
          message: d.message,
          service: d.service,
          status: d.status,
          createdAt: d.createdAt,
        }));
      } catch (err) {
        console.error('[ContactRepository] MongoDB find error, returning memory fallback:', err);
      }
    }

    return this.inMemoryContacts;
  }

  async findById(id: string): Promise<IContact | null> {
    if (isDBConnected()) {
      try {
        const doc = await Contact.findById(id);
        if (doc) {
          return {
            id: doc._id.toString(),
            name: doc.name,
            email: doc.email,
            message: doc.message,
            service: doc.service,
            status: doc.status,
            createdAt: doc.createdAt,
          };
        }
      } catch {
        // Fallback below
      }
    }
    return this.inMemoryContacts.find((c) => c.id === id) || null;
  }
}

export const contactRepository = new ContactRepository();
