import { Test, TestingModule } from '@nestjs/testing';
import { ProductVariantCategoryController } from './product-variant-category.controller';
import { ProductVariantCategoryService } from './product-variant-category.service';

describe('ProductVariantCategoryController', () => {
  let controller: ProductVariantCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductVariantCategoryController],
      providers: [ProductVariantCategoryService],
    }).compile();

    controller = module.get<ProductVariantCategoryController>(ProductVariantCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
