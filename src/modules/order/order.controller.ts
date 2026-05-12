import { Controller, Post, Body } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDTO } from './dto/create-order/create-order.dto';
import { OrderDTO } from './dto/order/order.dto';
import { toOrderDTO } from './dto/to-order/to-order-dto.mapper';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDTO): Promise<OrderDTO> {
    const newOrder = await this.orderService.create(createOrderDto);
    return toOrderDTO(newOrder);
  }
}
