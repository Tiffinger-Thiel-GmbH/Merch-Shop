import { Test, TestingModule } from '@nestjs/testing';
import { ProductVariantCategoryService } from './product-variant-category.service';

describe('ProductVariantCategoryService', () => {
  let service: ProductVariantCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductVariantCategoryService],
    }).compile();

    service = module.get<ProductVariantCategoryService>(ProductVariantCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
