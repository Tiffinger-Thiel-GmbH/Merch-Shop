import { Test, TestingModule } from '@nestjs/testing';
import { BadRequestException } from '@nestjs/common';
import { OrderService } from './order.service';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDTO } from './dto/create-order/create-order.dto';
import { CreateOrderItemDTO } from './dto/create-order/create-order-item.dto';

describe('OrderService', () => {
  let orderService: OrderService;

  const mockTx = {
    order: {
      create: jest.fn(),
    },
    product: {
      findMany: jest.fn(),
    },
    orderItem: {
      create: jest.fn(),
    },
    orderItemVariant: {
      create: jest.fn(),
    },
  };

  const mockPrismaService = {
    $transaction: jest.fn((callback: (tx: typeof mockTx) => unknown) => callback(mockTx)),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderService, { provide: PrismaService, useValue: mockPrismaService }],
    }).compile();

    orderService = module.get<OrderService>(OrderService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  function buildOrderItemDTO(overrides?: Partial<CreateOrderItemDTO>): CreateOrderItemDTO {
    return {
      productId: 'prod-1',
      quantity: 2,
      productVariantId: ['variant-1'],
      ...overrides,
    };
  }

  function buildCreateOrderDTO(overrides?: Partial<CreateOrderDTO>): CreateOrderDTO {
    return {
      userId: 'user-1',
      items: [buildOrderItemDTO()],
      ...overrides,
    };
  }

  describe('create', () => {
    it('should create an order with items and matching variants', async () => {
      const dto = buildCreateOrderDTO();

      const fakeOrder = { id: 'order-1', userId: 'user-1', createdAt: new Date() };
      mockTx.order.create.mockResolvedValue(fakeOrder);

      const fakeProduct = {
        id: 'prod-1',
        name: 'T-Shirt',
        description: 'A shirt',
        createdAt: new Date(),
        productVariants: [
          { id: 'variant-1', category: 'size', name: 'M', description: 'Medium', productId: 'prod-1', createdAt: new Date() },
          { id: 'variant-2', category: 'color', name: 'Red', description: 'Red color', productId: 'prod-1', createdAt: new Date() },
        ],
      };
      mockTx.product.findMany.mockResolvedValue([fakeProduct]);

      const fakeOrderItem = {
        id: 'item-1',
        orderId: 'order-1',
        productId: 'prod-1',
        name: 'T-Shirt',
        description: 'A shirt',
        quantity: 2,
      };
      mockTx.orderItem.create.mockResolvedValue(fakeOrderItem);

      const fakeVariant = {
        id: 'oiv-1',
        orderItemId: 'item-1',
        productVariantId: 'variant-1',
        name: 'M',
        description: 'Medium',
        category: 'size',
      };
      mockTx.orderItemVariant.create.mockResolvedValue(fakeVariant);

      const result = await orderService.create(dto);

      expect(result.order).toEqual(fakeOrder);
      expect(result.orderItems).toHaveLength(1);
      expect(result.orderItems[0]).toEqual({
        ...fakeOrderItem,
        orderItemVariant: [fakeVariant],
      });

      // Nur die bestellte Variante wurde erstellt
      expect(mockTx.orderItemVariant.create).toHaveBeenCalledTimes(1);
      expect(mockTx.orderItemVariant.create).toHaveBeenCalledWith({
        data: {
          orderItemId: 'item-1',
          productVariantId: 'variant-1',
          name: 'M',
          description: 'Medium',
          category: 'size',
        },
      });

      expect(mockTx.orderItem.create).toHaveBeenCalledWith({
        data: {
          orderId: 'order-1',
          productId: 'prod-1',
          name: 'T-Shirt',
          description: 'A shirt',
          quantity: 2,
        },
      });

      expect(mockTx.order.create).toHaveBeenCalledWith({
        data: { userId: 'user-1' },
      });
    });

    it('should support multiple items and multiple variants per item', async () => {
      const dto = buildCreateOrderDTO({
        items: [
          buildOrderItemDTO({ productId: 'prod-1', productVariantId: ['variant-1', 'variant-2'] }),
          buildOrderItemDTO({ productId: 'prod-2', quantity: 1, productVariantId: [] }),
        ],
      });

      mockTx.order.create.mockResolvedValue({ id: 'order-1', userId: 'user-1', createdAt: new Date() });

      const fakeProducts = [
        {
          id: 'prod-1',
          name: 'T-Shirt',
          description: null,
          createdAt: new Date(),
          productVariants: [
            { id: 'variant-1', category: 'size', name: 'M', description: 'Medium', productId: 'prod-1', createdAt: new Date() },
            { id: 'variant-2', category: 'color', name: 'Red', description: 'Red', productId: 'prod-1', createdAt: new Date() },
          ],
        },
        {
          id: 'prod-2',
          name: 'Hat',
          description: null,
          createdAt: new Date(),
          productVariants: [],
        },
      ];
      mockTx.product.findMany.mockResolvedValue(fakeProducts);

      mockTx.orderItem.create
        .mockResolvedValueOnce({ id: 'item-1', orderId: 'order-1', productId: 'prod-1', name: 'T-Shirt', description: null, quantity: 2 })
        .mockResolvedValueOnce({ id: 'item-2', orderId: 'order-1', productId: 'prod-2', name: 'Hat', description: null, quantity: 1 });

      mockTx.orderItemVariant.create.mockResolvedValue({});

      const result = await orderService.create(dto);

      expect(result.orderItems).toHaveLength(2);
      expect(mockTx.orderItemVariant.create).toHaveBeenCalledTimes(2);
      expect(result.orderItems[1].orderItemVariant).toEqual([]);
    });

    it('should throw BadRequestException if a product does not exist', async () => {
      const dto = buildCreateOrderDTO();

      mockTx.order.create.mockResolvedValue({ id: 'order-1', userId: 'user-1', createdAt: new Date() });
      mockTx.product.findMany.mockResolvedValue([]);

      await expect(orderService.create(dto)).rejects.toThrow(BadRequestException);

      expect(mockTx.orderItem.create).not.toHaveBeenCalled();
      expect(mockTx.orderItemVariant.create).not.toHaveBeenCalled();
    });

    it('should create an order item without variants if none of the ordered variant IDs match', async () => {
      const dto = buildCreateOrderDTO({
        items: [buildOrderItemDTO({ productVariantId: ['variant-1'] })],
      });

      mockTx.order.create.mockResolvedValue({ id: 'order-1', userId: 'user-1', createdAt: new Date() });

      const fakeProduct = {
        id: 'prod-1',
        name: 'T-Shirt',
        description: null,
        createdAt: new Date(),
        productVariants: [
          { id: 'variant-other', category: 'size', name: 'L', description: 'Large', productId: 'prod-1', createdAt: new Date() },
        ],
      };
      mockTx.product.findMany.mockResolvedValue([fakeProduct]);

      mockTx.orderItem.create.mockResolvedValue({
        id: 'item-1',
        orderId: 'order-1',
        productId: 'prod-1',
        name: 'T-Shirt',
        description: null,
        quantity: 2,
      });

      const result = await orderService.create(dto);

      expect(result.orderItems[0].orderItemVariant).toEqual([]);
      expect(mockTx.orderItemVariant.create).not.toHaveBeenCalled();
    });

    it('should propagate an error if variant creation fails', async () => {
      const dto = buildCreateOrderDTO();

      mockTx.order.create.mockResolvedValue({ id: 'order-1', userId: 'user-1', createdAt: new Date() });

      const fakeProduct = {
        id: 'prod-1',
        name: 'T-Shirt',
        description: null,
        createdAt: new Date(),
        productVariants: [
          { id: 'variant-1', category: 'size', name: 'M', description: 'Medium', productId: 'prod-1', createdAt: new Date() },
        ],
      };
      mockTx.product.findMany.mockResolvedValue([fakeProduct]);

      mockTx.orderItem.create.mockResolvedValue({
        id: 'item-1',
        orderId: 'order-1',
        productId: 'prod-1',
        name: 'T-Shirt',
        description: null,
        quantity: 2,
      });

      mockTx.orderItemVariant.create.mockRejectedValue(new Error('DB constraint violation'));

      await expect(orderService.create(dto)).rejects.toThrow('DB constraint violation');
    });

    it('should deduplicate productIds when the same product appears in multiple items', async () => {
      const dto = buildCreateOrderDTO({
        items: [buildOrderItemDTO({ productId: 'prod-1', quantity: 1 }), buildOrderItemDTO({ productId: 'prod-1', quantity: 3 })],
      });

      mockTx.order.create.mockResolvedValue({ id: 'order-1', userId: 'user-1', createdAt: new Date() });
      mockTx.product.findMany.mockResolvedValue([
        { id: 'prod-1', name: 'T-Shirt', description: null, createdAt: new Date(), productVariants: [] },
      ]);
      mockTx.orderItem.create.mockResolvedValue({});

      await orderService.create(dto);

      expect(mockTx.product.findMany).toHaveBeenCalledWith({
        where: { id: { in: ['prod-1'] } },
        include: { productVariants: true },
      });
    });
  });
});
