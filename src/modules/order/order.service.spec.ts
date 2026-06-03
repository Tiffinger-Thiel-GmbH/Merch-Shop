import { PrismaService } from '../prisma/prisma.service';
import { OrderService } from './order.service';

describe('OrderService.create', () => {
  let service: OrderService;
  let prisma: PrismaService;

  beforeEach(() => {
    prisma = {
      $transaction: jest.fn(),
    } as unknown as PrismaService;

    service = new OrderService(prisma);
  });

  it('Es soll eine Order mit Varianten erstellt werden.', async () => {
    const order = {
      id: 'order-1',
      userId: 'user-1',
    };

    const product = {
      id: 'product-1',
      name: 'T-Shirt',
      description: 'Basic T-Shirt',
    };

    const variant = {
      id: 'variant-1',
      productId: 'product-1',
      category: 'size',
      name: 'L',
      description: 'Large',
    };

    const createdOrderItem = {
      id: 'item-1',
      orderId: 'order-1',
      productId: 'product-1',
      name: 'T-Shirt',
      description: 'Basic T-Shirt',
      quantity: 2,
      orderItemVariant: [
        {
          productVariantId: 'variant-1',
          category: 'size',
          name: 'L',
          description: 'Large',
        },
      ],
    };

    const tx = {
      order: {
        create: jest.fn().mockResolvedValue(order),
      },
      product: {
        findMany: jest.fn().mockResolvedValue([product]),
      },
      productVariant: {
        findMany: jest.fn().mockResolvedValue([variant]),
      },
      orderItem: {
        create: jest.fn().mockResolvedValue(createdOrderItem),
      },
    };

    (prisma.$transaction as jest.Mock).mockImplementation(cb => cb(tx));

    const dto = {
      userId: 'user-1',
      items: [
        {
          productId: 'product-1',
          productVariantId: ['variant-1'],
          quantity: 2,
        },
      ],
    };

    const result = await service.create(dto);

    expect(tx.order.create).toHaveBeenCalledWith({
      data: {
        userId: 'user-1',
      },
    });

    expect(tx.product.findMany).toHaveBeenCalledWith({
      where: {
        id: {
          in: ['product-1'],
        },
      },
    });

    expect(tx.productVariant.findMany).toHaveBeenCalledWith({
      where: {
        id: {
          in: ['variant-1'],
        },
      },
    });

    expect(tx.orderItem.create).toHaveBeenCalledWith({
      data: {
        orderId: 'order-1',
        productId: 'product-1',
        name: 'T-Shirt',
        description: 'Basic T-Shirt',
        quantity: 2,
        orderItemVariant: {
          create: [
            {
              productVariantId: 'variant-1',
              category: 'size',
              name: 'L',
              description: 'Large',
            },
          ],
        },
      },
      include: {
        orderItemVariant: true,
      },
    });

    expect(result).toEqual({
      order,
      orderItems: [createdOrderItem],
    });
  });
});
