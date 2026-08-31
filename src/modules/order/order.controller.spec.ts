import { Test, TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { CreateOrderDTO } from './dto/create-order/create-order.dto';
import { OrderServiceCreateResult } from './order.service';
import { OrderDTO } from './dto/order/order.dto';

describe('OrderController', () => {
  let controller: OrderController;

  const mockOrderService = {
    create: jest.fn<PromiseLike<OrderServiceCreateResult>, [CreateOrderDTO]>(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderController],
      providers: [{ provide: OrderService, useValue: mockOrderService }],
    }).compile();

    controller = module.get<OrderController>(OrderController);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    const dto: CreateOrderDTO = {
      userId: 'user-1',
      items: [{ productId: 'prod-1', quantity: 2, productVariantId: ['variant-1'] }],
    };

    it('should call orderService.create with the DTO and return the mapped OrderDTO', async () => {
      const serviceResult: OrderServiceCreateResult = {
        order: { id: 'order-1', userId: 'user-1', status: 'PENDING', createdAt: new Date() },
        orderItems: [
          {
            id: 'item-1',
            orderId: 'order-1',
            productId: 'prod-1',
            name: 'T-Shirt',
            description: null,
            quantity: 2,
            orderItemVariant: [
              {
                id: 'oiv-1',
                orderItemId: 'item-1',
                productVariantId: 'variant-1',
                name: 'M',
                description: 'Medium',
                category: 'size',
              },
            ],
          },
        ],
      };
      mockOrderService.create.mockResolvedValue(serviceResult);

      const result = await controller.create(dto);

      // wurde der Service korrekt mit dem DTO aufgerufen?
      expect(mockOrderService.create).toHaveBeenCalledWith(dto);
      expect(mockOrderService.create).toHaveBeenCalledTimes(1);

      expect(result).toEqual({
        id: 'order-1',
        userId: 'user-1',
        items: [
          {
            id: 'item-1',
            orderId: 'order-1',
            productId: 'prod-1',
            name: 'T-Shirt',
            quantity: 2,
            productVariants: [
              {
                id: 'oiv-1',
                productVariantId: 'variant-1',
                category: 'size',
                name: 'M',
                description: 'Medium',
              },
            ],
          },
        ],
      } satisfies OrderDTO);
    });
  });
});
