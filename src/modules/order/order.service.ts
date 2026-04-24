import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Order, OrderItem } from '../../generated/prisma/client';
import { OrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(orderInput: OrderDto): Promise<{ order: Order; orderItems: OrderItem[] }> {
    const productIds = [...new Set(orderInput.items.map(item => item.productId))];

    return this.prisma.$transaction(async tx => {
      const order = await tx.order.create({
        data: {
          userId: orderInput.userId,
        },
      });

      const products = await tx.product.findMany({
        where: {
          id: {
            in: productIds,
          },
        },
      });

      if (products.length !== productIds.length) {
        throw new BadRequestException('One or more products were not found.');
      }

      const productById = new Map(products.map(product => [product.id, product]));
      const orderItems = await Promise.all(
        orderInput.items.map(item => {
          const product = productById.get(item.productId);

          if (!product) {
            throw new BadRequestException(`Product not found: ${item.productId}`);
          }

          return tx.orderItem.create({
            data: {
              orderId: order.id,
              productId: product.id,
              name: product.name,
              size: product.size,
              description: product.description,
              quantity: item.quantity,
            },
          });
        }),
      );

      return { order, orderItems };
    });
  }
}
