import { Test, TestingModule } from '@nestjs/testing';
import { ProductVariantService } from './product-variant.service';
import { PrismaService } from '../../prisma/prisma.service';

describe('ProductVariantService', () => {
  let service: ProductVariantService;

  const mockPrismaService = {
    productVariant: {
      findMany: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductVariantService, { provide: PrismaService, useValue: mockPrismaService }],
    }).compile();

    service = module.get<ProductVariantService>(ProductVariantService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findVariantsByProductId', () => {
    it('should query variants by productId, ordered by category/name/id', async () => {
      const fakeVariants = [
        { id: 'variant-1', category: 'size', name: 'M', description: 'Medium', productId: 'prod-1', createdAt: new Date() },
      ];
      mockPrismaService.productVariant.findMany.mockResolvedValue(fakeVariants);

      const result = await service.findVariantsByProductId('prod-1');

      expect(result).toEqual(fakeVariants);
      expect(mockPrismaService.productVariant.findMany).toHaveBeenCalledWith({
        where: { productId: 'prod-1', category: undefined },
        orderBy: [{ category: 'asc' }, { name: 'asc' }, { id: 'asc' }],
      });
    });

    it('should include the category filter when provided', async () => {
      mockPrismaService.productVariant.findMany.mockResolvedValue([]);

      await service.findVariantsByProductId('prod-1', 'size');

      expect(mockPrismaService.productVariant.findMany).toHaveBeenCalledWith({
        where: { productId: 'prod-1', category: 'size' },
        orderBy: [{ category: 'asc' }, { name: 'asc' }, { id: 'asc' }],
      });
    });

    it('should return an empty array when no variants match', async () => {
      mockPrismaService.productVariant.findMany.mockResolvedValue([]);

      const result = await service.findVariantsByProductId('prod-unknown');

      expect(result).toEqual([]);
    });

    it('should propagate database errors', async () => {
      mockPrismaService.productVariant.findMany.mockRejectedValue(new Error('DB error'));

      await expect(service.findVariantsByProductId('prod-1')).rejects.toThrow('DB error');
    });
  });
});
