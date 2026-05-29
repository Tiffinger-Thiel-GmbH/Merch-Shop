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
    const productVariantIds = [...new Set(orderInput.items.flatMap(item => item.productVariantId))];

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

      const productVariants = await tx.productVariant.findMany({
        where: {
          id: {
            in: productVariantIds,
          },
        },
      });

      if (productVariants.length !== productVariantIds.length) {
        throw new BadRequestException('One or more product variants were not found.');
      }

      const productById = new Map(products.map(product => [product.id, product]));
      const productVariantById = new Map(productVariants.map(productVariant => [productVariant.id, productVariant]));

      const orderItems: OrderItemWithVariants[] = [];

      for (const item of orderInput.items) {
        const product = productById.get(item.productId);

        if (!product) {
          throw new NotFoundException(`Product not found: ${item.productId}`);
        }

        const itemVariants = item.productVariantId.map(productVariantId => {
          const productVariant = productVariantById.get(productVariantId);

          if (!productVariant) {
            throw new NotFoundException(`Product variant not found: ${productVariantId}`);
          }

          if (productVariant.productId !== product.id) {
            throw new BadRequestException(`Product variant does not belong to product: ${productVariantId}`);
          }

          return {
            productVariantId: productVariant.id,
            category: productVariant.category,
            name: productVariant.name,
            description: productVariant.description,
          };
        });

        const orderItem = await tx.orderItem.create({
          data: {
            orderId: order.id,
            productId: product.id,
            name: product.name,
            description: product.description,
            quantity: item.quantity,
            orderItemVariant: {
              create: itemVariants,
            },
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
