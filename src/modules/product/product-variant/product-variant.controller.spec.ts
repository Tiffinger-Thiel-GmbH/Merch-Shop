import { Test, TestingModule } from '@nestjs/testing';
import { ProductVariantController } from './product-variant.controller';
import { ProductVariantService } from './product-variant.service';
import { ProductIdDTO } from './dto/product-id.dto';
import { ProductVariantIncomingDTO } from './dto/product-variant-incoming.dto';

describe('ProductVariantController', () => {
  let controller: ProductVariantController;

  const mockProductVariantService = {
    findVariantsByProductId: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductVariantController],
      providers: [{ provide: ProductVariantService, useValue: mockProductVariantService }],
    }).compile();

    controller = module.get<ProductVariantController>(ProductVariantController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findVariants', () => {
    const param: ProductIdDTO = { productId: 'prod-1' };

    it('should call the service with productId and category, then map the result', async () => {
      const query: ProductVariantIncomingDTO = { category: 'size' };
      const fakeVariants = [
        { id: 'variant-1', category: 'size', name: 'M', description: 'Medium', productId: 'prod-1', createdAt: new Date() },
        { id: 'variant-2', category: 'size', name: 'L', description: 'Large', productId: 'prod-1', createdAt: new Date() },
      ];
      mockProductVariantService.findVariantsByProductId.mockResolvedValue(fakeVariants);

      const result = await controller.findVariants(param, query);

      expect(mockProductVariantService.findVariantsByProductId).toHaveBeenCalledWith('prod-1', 'size');
      expect(result).toEqual({
        items: [
          { productVariantId: 'variant-1', category: 'size', name: 'M' },
          { productVariantId: 'variant-2', category: 'size', name: 'L' },
        ],
      });
    });

    it('should call the service without a category when none is provided', async () => {
      const query: ProductVariantIncomingDTO = {};
      mockProductVariantService.findVariantsByProductId.mockResolvedValue([]);

      await controller.findVariants(param, query);

      // --- Lektion: fehlender Query-Parameter wird als undefined durchgereicht ---
      expect(mockProductVariantService.findVariantsByProductId).toHaveBeenCalledWith('prod-1', undefined);
    });

    it('should return an empty items array when no variants are found', async () => {
      mockProductVariantService.findVariantsByProductId.mockResolvedValue([]);

      const result = await controller.findVariants(param, {});

      expect(result).toEqual({ items: [] });
    });
  });
});
