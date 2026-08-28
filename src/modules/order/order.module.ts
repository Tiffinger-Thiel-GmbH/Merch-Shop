import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { MailModule } from '../mail/mail.module';
import { MailService } from '../mail/mail.service';

@Module({
  imports: [PrismaModule, MailModule],
  controllers: [OrderController],
  providers: [OrderService, MailService],
})
export class OrderModule {}
