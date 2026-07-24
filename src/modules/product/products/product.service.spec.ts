import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('ProductService', () => {
  let service: ProductService;

  const mockPrismaService = {
    product: {
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService, { provide: PrismaService, useValue: mockPrismaService }],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return all products from prisma', async () => {
      const fakeProducts = [
        { id: 'prod-1', name: 'T-Shirt', description: 'A shirt', createdAt: new Date() },
        { id: 'prod-2', name: 'Hat', description: null, createdAt: new Date() },
      ];
      mockPrismaService.product.findMany.mockResolvedValue(fakeProducts);

      const result = await service.findAll();

      expect(result).toEqual(fakeProducts);
      expect(mockPrismaService.product.findMany).toHaveBeenCalledWith();
      expect(mockPrismaService.product.findMany).toHaveBeenCalledTimes(1);
    });

    it('should return an empty array when there are no products', async () => {
      mockPrismaService.product.findMany.mockResolvedValue([]);

      const result = await service.findAll();

      expect(result).toEqual([]);
    });

    it('should propagate an error if the database call fails', async () => {
      mockPrismaService.product.findMany.mockRejectedValue(new Error('Connection lost'));

      await expect(service.findAll()).rejects.toThrow('Connection lost');
    });
  });
});
