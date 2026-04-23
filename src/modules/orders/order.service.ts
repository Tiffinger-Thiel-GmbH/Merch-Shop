import { Injectable } from '@nestjs/common';
import { Order } from '../../generated/prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(order: CreateOrderDto): Promise<Order> {
    return this.prisma.order.create({
      data: {
        ...order,
        createdAt: new Date(),
      },
    });
  }

  async findAll(): Promise<Order[]> {
    return this.prisma.order.findMany();
  }

  async update(id: string, data: UpdateOrderDto): Promise<Order> {
    return this.prisma.order.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<Order> {
    return this.prisma.order.delete({ where: { id } });
  }
}
