import { Controller, Post, Body, Patch, Param } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDTO } from './dto/create-order/create-order.dto';
import { OrderDTO } from './dto/order/order.dto';
import { toOrderDTO } from './dto/to-order/to-order-dto.mapper';
import { UpdateOrderStatusDTO } from './dto/update-order-status/update-order-status.dto';

@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDTO): Promise<OrderDTO> {
    const newOrder = await this.orderService.create(createOrderDto);
    return toOrderDTO(newOrder);
  }

  @Patch(':id/status')
  async updateStatus(@Param('id') id: string, @Body() updateOrderStatusDto: UpdateOrderStatusDTO): Promise<OrderDTO> {
    const updatedOrder = await this.orderService.updateStatus(id, updateOrderStatusDto.status);
    return toOrderDTO(updatedOrder);
  }
}
