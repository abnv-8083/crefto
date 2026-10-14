import nodemailer, { Transporter } from 'nodemailer';

export interface IInquiryEmailPayload {
  name: string;
  email: string;
  message: string;
  service?: string;
}

export class EmailService {
  private transporter: Transporter | null = null;
  private recipientEmail: string;

  constructor() {
    this.recipientEmail = process.env.INQUIRY_RECIPIENT_EMAIL || 'crefto@charease.in';
    this.initTransporter();
  }

  private initTransporter(): void {
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;

    if (!user || !pass) {
      // SMTP not configured yet; log notice
      console.warn(
        `[EmailService] SMTP credentials not set (SMTP_USER/SMTP_PASS). Inquiries are stored in MongoDB. Recipient is configured as: ${this.recipientEmail}`
      );
      this.transporter = null;
      return;
    }

    const host = process.env.SMTP_HOST || 'smtp.gmail.com';
    const port = Number(process.env.SMTP_PORT) || 587;
    const secure = process.env.SMTP_SECURE === 'true' || port === 465;

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass,
      },
    });

    console.log(`[EmailService] SMTP initialized successfully with host: ${host}:${port} for recipient: ${this.recipientEmail}`);
  }

  /**
   * Dispatches an inquiry notification email to crefto@charease.in
   */
  async sendInquiryEmail(payload: IInquiryEmailPayload): Promise<{ sent: boolean; messageId?: string; reason?: string }> {
    const recipient = process.env.INQUIRY_RECIPIENT_EMAIL || this.recipientEmail;
    const serviceName = payload.service || 'General Inquiry';
    const clientName = payload.name;
    const clientEmail = payload.email;
    const clientMessage = payload.message;
    const timestamp = new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata', dateStyle: 'full', timeStyle: 'medium' });

    if (!this.transporter) {
      console.log(
        `[EmailService] Inquiry received for ${recipient}:\n  From: ${clientName} (${clientEmail})\n  Service: ${serviceName}\n  Message: ${clientMessage.slice(0, 100)}...`
      );
      return {
        sent: false,
        reason: 'SMTP not configured in environment variables. Stored safely in database.',
      };
    }

    const mailOptions = {
      from: process.env.SMTP_FROM || `"Crefto Inquiries" <${process.env.SMTP_USER}>`,
      to: recipient,
      replyTo: `"${clientName}" <${clientEmail}>`,
      subject: `[Crefto Inquiry] ${serviceName} — from ${clientName}`,
      text: `
New Project Inquiry Received for Crefto

Client Name: ${clientName}
Client Email: ${clientEmail}
Project Type: ${serviceName}
Received At: ${timestamp} IST

Message / Project Details:
---------------------------------------------
${clientMessage}
---------------------------------------------

Reply directly to this email to contact ${clientName} at ${clientEmail}.
      `.trim(),
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0b0b0e; color: #f3f4f6; margin: 0; padding: 24px; }
    .container { max-width: 600px; margin: 0 auto; background-color: #121217; border: 1px solid #27272a; border-radius: 16px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #ff3838 0%, #d62828 100%); padding: 28px 32px; color: #ffffff; }
    .header h1 { margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.02em; }
    .header p { margin: 6px 0 0 0; font-size: 14px; opacity: 0.9; }
    .content { padding: 32px; }
    .badge { display: inline-block; background-color: rgba(255, 56, 56, 0.15); color: #ff5252; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 20px; }
    .field-row { margin-bottom: 20px; }
    .field-label { font-size: 12px; font-weight: 600; text-transform: uppercase; color: #9ca3af; letter-spacing: 0.05em; margin-bottom: 6px; }
    .field-value { font-size: 16px; color: #f9fafb; font-weight: 500; }
    .field-value a { color: #ff5252; text-decoration: none; }
    .message-box { background-color: #18181f; border: 1px solid #27272a; border-radius: 10px; padding: 18px 20px; margin-top: 8px; font-size: 15px; line-height: 1.6; color: #e5e7eb; white-space: pre-wrap; }
    .footer { padding: 20px 32px; background-color: #0d0d10; border-top: 1px solid #1f1f23; text-align: center; font-size: 13px; color: #6b7280; }
    .btn { display: inline-block; background: #ff3838; color: #ffffff !important; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 14px; margin-top: 16px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>CREFTO</h1>
      <p>Direct Project Inquiry Notification</p>
    </div>
    <div class="content">
      <div class="badge">${serviceName}</div>

      <div class="field-row">
        <div class="field-label">Client Name</div>
        <div class="field-value">${clientName}</div>
      </div>

      <div class="field-row">
        <div class="field-label">Client Email</div>
        <div class="field-value"><a href="mailto:${clientEmail}">${clientEmail}</a></div>
      </div>

      <div class="field-row">
        <div class="field-label">Received At</div>
        <div class="field-value">${timestamp} IST</div>
      </div>

      <div class="field-row">
        <div class="field-label">Project Details / Message</div>
        <div class="message-box">${clientMessage}</div>
      </div>

      <div style="text-align: center; margin-top: 28px;">
        <a href="mailto:${clientEmail}?subject=Re: Crefto Project Inquiry - ${serviceName}" class="btn">Reply to ${clientName}</a>
      </div>
    </div>
    <div class="footer">
      Sent automatically to <strong>${recipient}</strong> via Crefto Website Backend.
    </div>
  </div>
</body>
</html>
      `.trim(),
    };

    try {
      const info = await this.transporter.sendMail(mailOptions);
      console.log(`[EmailService] Inquiry email successfully sent to ${recipient}. MessageId: ${info.messageId}`);
      return { sent: true, messageId: info.messageId };
    } catch (err: any) {
      console.error(`[EmailService] Failed to send email to ${recipient}:`, err?.message || err);
      return { sent: false, reason: err?.message || 'SMTP dispatch error' };
    }
  }
}

export const emailService = new EmailService();
