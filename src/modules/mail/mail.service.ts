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
    const filterProductVariants = order.items.flatMap(item => item.productVariants ?? []);
    const productVariantSummary = filterProductVariants.map(variant => `${variant.category}: ${variant.name}`).join(', ');

    // [
    //   [
    //     {"category":"Size","name":"14-inch"},
    //     {"category":"Color","name":"Charcoal"}
    //   ]
    // ]

    await this.sendMail({
      subject: `Bestellung von ${order.id} benötigt Freigabe`,
      html: `
        <div style="font-family: Arial, Helvetica, sans-serif; max-width: 480px; margin: 0 auto; background:#f9fafb; padding: 24px; border-radius: 8px; border: 1px solid #e5e7eb;">
  
  <h2 style="margin: 0 0 16px 0; color: #111827; font-size: 18px;">
    🛒 Neue Bestellung
  </h2>

  <p style="margin: 0 0 4px 0; color: #374151; font-size: 14px;">
    Bestellt von: <b>${order.userId}</b>
  </p>

  <div style="background:#fff; border: 1px solid #e5e7eb; border-radius: 6px; padding: 12px 16px; margin: 12px 0 20px 0;">
    <p style="margin: 0; font-size: 15px; color: #111827;">
      <b>${productName}</b>
    </p>
    <p style="margin: 4px 0 0 0; font-size: 13px; color: #6b7280;">
      ${productVariantSummary}
    </p>
  </div>

  <table role="presentation" cellpadding="0" cellspacing="0" border="0">
    <tr>
      <td style="border-radius: 6px; background:#16a34a;">
        <a href="${approveUrl}" style="display:inline-block; padding: 10px 20px; color:#fff; text-decoration:none; font-size: 14px; font-weight: bold; border-radius: 6px;">
          ✓ Genehmigen
        </a>
      </td>
      <td style="width: 12px;"></td>
      <td style="border-radius: 6px; background:#dc2626;">
        <a href="${rejectUrl}" style="display:inline-block; padding: 10px 20px; color:#fff; text-decoration:none; font-size: 14px; font-weight: bold; border-radius: 6px;">
          ✕ Ablehnen
        </a>
      </td>
    </tr>
  </table>

</div>
      `,
      text: `Bestellung #${order.id} (${productName}, ${productVariantSummary}) benötigt Freigabe. Genehmigen: ${approveUrl} | Ablehnen: ${rejectUrl}`,
    });
  }
}
