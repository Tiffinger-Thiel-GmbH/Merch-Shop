import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaService } from '../prisma/prisma.service';
import { ProductService } from '../products/product.service';

@Module({
  imports: [PrismaService, ProductService],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
