import { Test, TestingModule } from '@nestjs/testing';
import { ProductVariantCategoryController } from './product-variant-category.controller';
import { ProductVariantCategoryService } from './product-variant-category.service';
import { ProductVariantCategoriesDTO } from './dto/product-variant-categories.dto';

describe('ProductVariantCategoryController', () => {
  let controller: ProductVariantCategoryController;

  const mockProductVariantCategoryService = {
    findCategoriesByProductId: jest.fn<PromiseLike<ProductVariantCategoriesDTO>, []>(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductVariantCategoryController],
      providers: [{ provide: ProductVariantCategoryService, useValue: mockProductVariantCategoryService }],
    }).compile();

    controller = module.get<ProductVariantCategoryController>(ProductVariantCategoryController);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('findCategories', () => {
    it('should call the service with productId and return its result directly', async () => {
      const fakeResult = { categories: ['Color', 'Size'] };
      mockProductVariantCategoryService.findCategoriesByProductId.mockResolvedValue(fakeResult);

      const result = await controller.findCategories('a800a125-27ac-49cc-8125-ec8ae1b000a5');

      expect(mockProductVariantCategoryService.findCategoriesByProductId).toHaveBeenCalledWith('a800a125-27ac-49cc-8125-ec8ae1b000a5');
      expect(result).toEqual(fakeResult);
    });

    it('should propagate errors from the service', async () => {
      mockProductVariantCategoryService.findCategoriesByProductId.mockRejectedValue(new Error('DB error'));

      await expect(controller.findCategories('a800a125-27ac-49cc-8125-ec8ae1b000a5')).rejects.toThrow('DB error');
    });
  });
});
