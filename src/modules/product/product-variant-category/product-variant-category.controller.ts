import { Controller, Get, Query } from '@nestjs/common';
import { ProductVariantCategoryService } from './product-variant-category.service';
import { ApiTags } from '@nestjs/swagger';
import { ProductVariantCategoriesDTO } from './dto/product-variant-categories.dto';

@ApiTags('Product Category')
@Controller('product-variant-category')
export class ProductVariantCategoryController {
  constructor(private readonly productVariantCategoryService: ProductVariantCategoryService) {}

  @Get('/category')
  public async findCategories(@Query('productId') productId: string): Promise<ProductVariantCategoriesDTO> {
    // optional filter on productId
    // .../product-variant-category?productId=sdlfk
    // -> { "categories": ["Color", "Size"]}
    return this.productVariantCategoryService.findCategoriesByProductId(productId);
  }
}
