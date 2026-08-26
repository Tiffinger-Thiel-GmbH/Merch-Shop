import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { OrderDTO } from '../order/dto/order/order.dto';

@Injectable()
export class MailService implements OnModuleInit {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo>;

  constructor() {
    this.logger.log('MailService instance created');
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  async onModuleInit(): Promise<void> {
    try {
      await this.transporter.verify();
      this.logger.log('SMTP-Verbindung erfolgreich verifiziert');
    } catch (err) {
      this.logger.error('SMTP-Verbindung fehlgeschlagen', err instanceof Error ? err.stack : err);
    }
  }

  async sendMail(options: { subject: string; html: string; text?: string }): Promise<SMTPTransport.SentMessageInfo> {
    this.logger.debug('sendMail called', process.env.APPROVER_EMAIL);
    try {
      const info = await this.transporter.sendMail({
        from: process.env.MAIL_FROM ?? 'no-reply@example.com',
        to: process.env.APPROVER_EMAIL,
        subject: options.subject,
        html: options.html,
        text: options.text,
      });

      this.logger.log(`Mail gesendet: ${info.messageId}`);
      return info;
    } catch (err) {
      this.logger.error(`Mail-Versand fehlgeschlagen an ${options.subject}`, err instanceof Error ? err.stack : err);
      throw err;
    }
  }

  // Order-Mail mit einfachen Action-Links
  async sendOrderActionEmail(order: OrderDTO): Promise<void> {
    const baseUrl = process.env.APP_BASE_URL;
    const productName = order.items.map(item => item.name).join(', ');
    const approveUrl = `${baseUrl}/orders/${order.id}/status?action=PROCESSING`;
    const rejectUrl = `${baseUrl}/orders/${order.id}/status?action=cancelled`;

    await this.sendMail({
      subject: `Bestellung #${order.id} benötigt Freigabe`,
      html: `
        <p>Neue Bestellung von ${order.userId}: <b>${productName}</b></p>
        <p>
          <a href="${approveUrl}" style="background:#16a34a;color:#fff;padding:8px 16px;text-decoration:none;border-radius:4px;">Genehmigen</a>
          &nbsp;
          <a href="${rejectUrl}" style="background:#dc2626;color:#fff;padding:8px 16px;text-decoration:none;border-radius:4px;">Ablehnen</a>
        </p>
      `,
      text: `Bestellung #${order.id} (${productName}) benötigt Freigabe. Genehmigen: ${approveUrl} | Ablehnen: ${rejectUrl}`,
    });
  }
}
