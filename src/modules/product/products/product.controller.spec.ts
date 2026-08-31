import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from '../../../generated/prisma/client';
import { ProductListDTO } from './dtos/product-list.dto';

describe('ProductsController', () => {
  let controller: ProductsController;

  const mockProductService = {
    findAll: jest.fn<PromiseLike<Product[]>, []>(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [{ provide: ProductService, useValue: mockProductService }],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('findAll', () => {
    it('should return items and totalCount mapped from the service result', async () => {
      const fakeProducts: Product[] = [
        { id: 'prod-1', name: 'T-Shirt', description: 'A shirt', imageUrl: 'url', createdAt: new Date() },
        { id: 'prod-2', name: 'Hat', description: null, imageUrl: 'url', createdAt: new Date() },
      ];
      mockProductService.findAll.mockResolvedValue(fakeProducts);

      const result = await controller.findAll();

      expect(result).toEqual({
        items: [
          { id: 'prod-1', name: 'T-Shirt', description: 'A shirt' },
          { id: 'prod-2', name: 'Hat', description: null },
        ],
        totalCount: 2,
      } satisfies ProductListDTO);
      expect(mockProductService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return totalCount 0 and an empty items array when there are no products', async () => {
      mockProductService.findAll.mockResolvedValue([]);

      const result = await controller.findAll();

      expect(result).toEqual({ items: [], totalCount: 0 });
    });
  });
});
