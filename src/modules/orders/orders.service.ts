import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  constructor(private readonly prisma: PrismaService) {}

  create(createOrderDto: CreateOrderDto) {
    const { name, size, description } = createOrderDto;
    return this.prisma.create({
      name,
      size,
      description,
    });
  }

  findAll() {
    return this.prisma.findAll();
  }

  findOne(id: string) {
    return this.prisma.findOne(id);
  }

  update(id: string, updateOrderDto: UpdateOrderDto) {
    return this.prisma.update(id, updateOrderDto);
  }

  remove(id: string) {
    return this.prisma.remove(id);
  }
}
