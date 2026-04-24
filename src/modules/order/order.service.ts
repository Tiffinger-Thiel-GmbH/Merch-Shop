import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Order, OrderItem } from '../../generated/prisma/client';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}
  async createOrder(
    userId: string,
    productItems: {
      productId: string;
      quantity: number;
      size?: string | null;
      name: string;
      description?: string | null;
    }[],
  ): Promise<{ order: Order; orderItems: OrderItem[] }> {
    return this.prisma.$transaction(async tx => {
      const order = await tx.order.create({
        data: {
          userId,
          status: 'PENDING',
        },
      });

      const orderItems = await Promise.all(
        productItems.map(async item => {
          const product = await tx.product.findUnique({
            where: { id: item.productId },
          });

          if (!product) {
            throw new Error(`Product not found: ${item.productId}`);
          }

          return tx.orderItem.create({
            data: {
              orderId: order.id,
              productId: item.productId,
              quantity: item.quantity,
              name: item.name,
              size: item.size,
              description: item.description,
            },
          });
        }),
      );

      return { order, orderItems };
    });
  }
}
