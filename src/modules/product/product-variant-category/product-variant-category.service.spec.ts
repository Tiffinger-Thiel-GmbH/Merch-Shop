import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../../prisma/prisma.service';
import { ProductVariantCategoryService } from './product-variant-category.service';
import { ProductVariant } from '../../../generated/prisma/client';
import { ProductVariantCreateArgs } from '../../../generated/prisma/models';

describe('ProductVariantCategoryService', () => {
  let service: ProductVariantCategoryService;

  const mockPrismaService = {
    productVariant: {
      findMany: jest.fn<PromiseLike<ProductVariant[]>, [ProductVariantCreateArgs]>(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductVariantCategoryService, { provide: PrismaService, useValue: mockPrismaService }],
    }).compile();

    service = module.get<ProductVariantCategoryService>(ProductVariantCategoryService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findCategoriesByProductId', () => {
    it('should return distinct categories for a product', async () => {
      mockPrismaService.productVariant.findMany.mockResolvedValue([
        { category: 'Color', createdAt: new Date(), description: '', id: '1', name: 'Red', productId: '1' },
        { category: 'Size', createdAt: new Date(), description: '', id: '1', name: 'L', productId: '1' },
      ]);

      const result = await service.findCategoriesByProductId('prod-1');

      expect(result).toEqual({ categories: ['Color', 'Size'] });
      expect(mockPrismaService.productVariant.findMany).toHaveBeenCalledWith({
        where: { productId: 'prod-1' },
        select: { category: true },
        distinct: ['category'],
      });
    });

    it('should return an empty categories array when the product has no variants', async () => {
      mockPrismaService.productVariant.findMany.mockResolvedValue([]);

      const result = await service.findCategoriesByProductId('prod-1');

      expect(result).toEqual({ categories: [] });
    });

    it('should filter out falsy category values', async () => {
      mockPrismaService.productVariant.findMany.mockResolvedValue([
        { category: 'Color', createdAt: new Date(), description: '', id: '1', name: 'Red', productId: '1' },
        { category: '', createdAt: new Date(), description: '', id: '1', name: 'Red', productId: '1' },
      ]);

      const result = await service.findCategoriesByProductId('prod-1');

      expect(result).toEqual({ categories: ['Color'] });
    });

    it('should propagate database errors', async () => {
      mockPrismaService.productVariant.findMany.mockRejectedValue(new Error('DB error'));

      await expect(service.findCategoriesByProductId('prod-1')).rejects.toThrow('DB error');
    });
  });
});
