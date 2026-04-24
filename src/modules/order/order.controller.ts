import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from './dto/order.dto';
import { Order, OrderItem } from '../../generated/prisma/client';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  create(@Body() createOrderDto: OrderDto): Promise<{ order: Order; orderItems: OrderItem[] }> {
    return this.orderService.create(createOrderDto);
  }
}
