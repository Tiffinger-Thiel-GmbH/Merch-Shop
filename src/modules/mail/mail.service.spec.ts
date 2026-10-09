import { BadRequestException } from '@nestjs/common';
import nodemailer from 'nodemailer';
import { MailService } from './mail.service';
import { UserService } from '../user/user.service';
import { OrderDTO } from '../order/dto/order/order.dto';

jest.mock('nodemailer', () => {
  const createTransport = jest.fn();
  return {
    __esModule: true,
    default: { createTransport },
    createTransport,
  };
});

describe('MailService', () => {
  let service: MailService;
  const userService = { findById: jest.fn() };
  const transporter = { verify: jest.fn(), sendMail: jest.fn() };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.mocked(nodemailer.createTransport).mockReturnValue(transporter as never);
    service = new MailService(userService as unknown as UserService);
  });

  afterEach(() => jest.restoreAllMocks());

  it('verifies the SMTP connection on module initialization', async () => {
    transporter.verify.mockResolvedValue(true);

    await expect(service.onModuleInit()).resolves.toBeUndefined();
    expect(transporter.verify).toHaveBeenCalledTimes(1);
  });

  it('handles SMTP verification failures without rejecting initialization', async () => {
    transporter.verify.mockRejectedValue(new Error('SMTP unavailable'));

    await expect(service.onModuleInit()).resolves.toBeUndefined();
  });

  it('sends mail with the default sender and configured recipient', async () => {
    const info = { messageId: 'message-1' };
    transporter.sendMail.mockResolvedValue(info);

    await expect(service.sendMail({ subject: 'Hello', html: '<p>Hello</p>', text: 'Hello' })).resolves.toBe(info);
    expect(transporter.sendMail).toHaveBeenCalledWith({
      from: process.env.MAIL_FROM ?? 'no-reply@example.com',
      to: process.env.APPROVER_EMAIL,
      subject: 'Hello',
      html: '<p>Hello</p>',
      text: 'Hello',
    });
  });

  it('uses an explicit sender and propagates send failures', async () => {
    transporter.sendMail.mockRejectedValue(new Error('send failed'));

    await expect(service.sendMail({ from: 'sender@example.com', subject: 'Hello', html: '<p>Hello</p>' })).rejects.toThrow('send failed');
    expect(transporter.sendMail).toHaveBeenCalledWith(expect.objectContaining({ from: 'sender@example.com', subject: 'Hello' }));
  });

  describe('sendOrderActionEmail', () => {
    const order: OrderDTO = {
      id: '90be719b-c708-4e1b-8120-cfdc6cfd72a0',
      userId: '41aa7c67-a0b5-40c9-994e-60c7e64f7f09',
      items: [
        {
          id: '4491a0e6-cb57-45ac-b545-b3c6d26a8308',
          orderId: '90be719b-c708-4e1b-8120-cfdc6cfd72a0',
          productId: 'aa497285-9b6a-48a1-a756-fa3717b7f9e5',
          name: 'T-Shirt',
          quantity: 2,
          productVariants: [
            {
              id: 'cd9b0c25-af01-4c64-95d9-a9b651b0eb8e',
              productVariantId: 'cd9b0c25-af01-4c64-95d9-a9b651b0eb8e',
              category: 'Size',
              name: 'M',
              description: 'Medium',
            },
          ],
        },
      ],
    };

    it('sends a summary to the approver using the customer as sender', async () => {
      userService.findById.mockResolvedValue({ id: '41aa7c67-a0b5-40c9-994e-60c7e64f7f09', name: 'Ada', email: 'ada@example.com' });
      transporter.sendMail.mockResolvedValue({ messageId: 'message-1' });

      await service.sendOrderActionEmail(order);

      expect(userService.findById).toHaveBeenCalledWith('41aa7c67-a0b5-40c9-994e-60c7e64f7f09');
      expect(transporter.sendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          from: 'ada@example.com',
          to: process.env.APPROVER_EMAIL,
          subject: 'Bestellung von Ada',
          html: expect.stringContaining('Neue Bestellung') as string,
          text: expect.stringContaining('Size: M') as string,
        }),
      );
    });

    it('throws when the order customer cannot be found', async () => {
      userService.findById.mockResolvedValue(undefined);

      await expect(service.sendOrderActionEmail(order)).rejects.toThrow(BadRequestException);
      expect(transporter.sendMail).not.toHaveBeenCalled();
    });
  });
});
