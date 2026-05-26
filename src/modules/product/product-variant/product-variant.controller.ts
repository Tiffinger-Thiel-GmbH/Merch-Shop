import { Controller, Get, Query } from '@nestjs/common';
import { ProductVariantService } from './product-variant.service';

@Controller('product-variant')
export class ProductVariantController {
  constructor(private readonly productVariantService: ProductVariantService) {}

  @Get('/variants')
  public async findVariants(@Query('productId') productId: string): Promise<{ variant: string[] }> {
    // optional filter on productId
    // .../product-variant-category?productId=sdlfk
    // -> { "categories": ["Color", "Size"]}
    return await this.productVariantService.findVariantsByProductId(productId);
  }
}
