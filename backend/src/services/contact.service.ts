import { ContactRepository, contactRepository } from '../repositories/contact.repository';
import { IContact } from '../models/Contact';
import { emailService } from './email.service';

export class ContactService {
  private contactRepo: ContactRepository;

  constructor() {
    this.contactRepo = contactRepository;
  }

  async processContactSubmission(data: IContact): Promise<{ success: boolean; message: string; contact?: IContact; emailNotification?: boolean }> {
    if (!data.name || !data.email || !data.message) {
      throw new Error('All fields (name, email, message) are required.');
    }

    const saved = await this.contactRepo.save(data);

    // Extract selected service if passed or if encoded in message header
    let service = data.service;
    if (!service) {
      const match = data.message.match(/\[Project Type:\s*([^\]]+)\]/i);
      if (match) {
        service = match[1].trim();
      }
    }

    // Dispatch email notification to crefto@charease.in
    let emailSent = false;
    try {
      const emailResult = await emailService.sendInquiryEmail({
        name: data.name,
        email: data.email,
        message: data.message,
        service: service || 'Direct Website Inquiry',
      });
      emailSent = emailResult.sent;
    } catch (err: any) {
      console.error('[ContactService] Error dispatching inquiry email:', err?.message || err);
    }

    return {
      success: true,
      message: 'Thank you for reaching out to Crefto! Your inquiry has been sent to crefto@charease.in. We will contact you soon.',
      contact: saved,
      emailNotification: emailSent,
    };
  }

  async getAllContacts(): Promise<IContact[]> {
    return this.contactRepo.findAll();
  }
}
