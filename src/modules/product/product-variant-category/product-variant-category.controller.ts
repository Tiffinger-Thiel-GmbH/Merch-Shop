import { Controller, Get, Query } from '@nestjs/common';
import { ProductVariantCategoryService } from './product-variant-category.service';

@Controller('product-variant-category')
export class ProductVariantCategoryController {
  constructor(private readonly productVariantCategoryService: ProductVariantCategoryService) {}

  @Get('/category')
  public async findCategories(@Query('productId') productId: string): Promise<{ categories: string[] }> {
    // optional filter on productId
    // .../product-variant-category?productId=sdlfk
    // -> { "categories": ["Color", "Size"]}
    return this.productVariantCategoryService.findCategoriesByProductId(productId);
  }
}
