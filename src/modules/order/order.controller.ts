import { Controller, Post, Body, Param, Get, Query } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDTO } from './dto/create-order/create-order.dto';
import { OrderDTO } from './dto/order/order.dto';
import { toOrderDTO } from './dto/to-order/to-order-dto.mapper';
import { UpdateOrderStatusDTO } from './dto/update-order-status/update-order-status.dto';
import { MailService } from '../mail/mail.service';

@Controller('orders')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly mailService: MailService,
  ) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDTO): Promise<OrderDTO> {
    const newOrder = await this.orderService.create(createOrderDto);
    const orderDTO = toOrderDTO(newOrder);
    const newMail = await this.mailService.sendOrderActionEmail(orderDTO);
    return orderDTO;
  }

  @Get(':id/status')
  async updateStatus(@Param('id') id: string, @Query() updateOrderStatusDTO: UpdateOrderStatusDTO): Promise<OrderDTO> {
    const updatedOrder = await this.orderService.updateStatus(id, updateOrderStatusDTO.action);
    return toOrderDTO(updatedOrder);
  }
}
