import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Order, OrderItem, OrderItemVariant } from '../../generated/prisma/client';
import { CreateOrderDTO } from './dto/create-order/create-order.dto';

type OrderItemWithVariants = OrderItem & {
  orderItemVariant: OrderItemVariant[];
};

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async create(orderInput: CreateOrderDTO): Promise<{ order: Order; orderItems: OrderItemWithVariants[] }> {
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
        include: {
          productVariants: true,
        },
      });

      if (products.length !== productIds.length) {
        throw new BadRequestException('One or more products were not found.');
      }

      const productById = new Map(products.map(product => [product.id, product]));

      const orderItems: OrderItemWithVariants[] = [];

      for (const item of orderInput.items) {
        const product = productById.get(item.productId);

        if (!product) {
          throw new NotFoundException(`Product not found: ${item.productId}`);
        }

        const orderItem = await tx.orderItem.create({
          data: {
            orderId: order.id,
            productId: product.id,
            name: product.name,
            description: product.description,
            quantity: item.quantity,
          },
          include: {
            orderItemVariant: true,
          },
        });

        orderItems.push(orderItem);
      }

      return { order, orderItems };
    });
  }
}
