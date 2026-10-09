import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ProductVariantCategoryService } from './product-variant-category.service';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { ProductVariantCategoriesDTO } from './dto/product-variant-categories.dto';

@ApiTags('Product Category')
@Controller('/product')
export class ProductVariantCategoryController {
  constructor(private readonly productVariantCategoryService: ProductVariantCategoryService) {}

  @Get('/:productId/category')
  @ApiParam({
    name: 'productId',
    required: true,
    type: String,
    example: '22222222-2222-4222-8222-222222222222',
  })
  public async findCategories(@Param('productId', ParseUUIDPipe) productId: string): Promise<ProductVariantCategoriesDTO> {
    // optional filter on productId
    // .../product-variant-category?productId=sdlfk
    // -> { "categories": ["Color", "Size"]}
    return this.productVariantCategoryService.findCategoriesByProductId(productId);
  }
}
