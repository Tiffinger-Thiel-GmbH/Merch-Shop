import { Test, TestingModule } from '@nestjs/testing';
import { ProductVariantCategoryController } from './product-variant-category.controller';
import { ProductVariantCategoryService } from './product-variant-category.service';

describe('ProductVariantCategoryController', () => {
  let controller: ProductVariantCategoryController;

  const mockProductVariantCategoryService = {
    findCategoriesByProductId: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductVariantCategoryController],
      providers: [{ provide: ProductVariantCategoryService, useValue: mockProductVariantCategoryService }],
    }).compile();

    controller = module.get<ProductVariantCategoryController>(ProductVariantCategoryController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findCategories', () => {
    it('should call the service with productId and return its result directly', async () => {
      const fakeResult = { categories: ['Color', 'Size'] };
      mockProductVariantCategoryService.findCategoriesByProductId.mockResolvedValue(fakeResult);

      const result = await controller.findCategories('prod-1');

      expect(mockProductVariantCategoryService.findCategoriesByProductId).toHaveBeenCalledWith('prod-1');
      expect(result).toEqual(fakeResult);
    });

    it('should propagate errors from the service', async () => {
      mockProductVariantCategoryService.findCategoriesByProductId.mockRejectedValue(new Error('DB error'));

      await expect(controller.findCategories('prod-1')).rejects.toThrow('DB error');
    });
  });
});
