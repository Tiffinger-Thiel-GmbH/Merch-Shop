import { Controller, Get, Query } from '@nestjs/common';
import { ProductVariantService } from './product-variant.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Product Variants')
@Controller('product-variant')
export class ProductVariantController {
  constructor(private readonly productVariantService: ProductVariantService) {}

  @Get('/variants')
  public async findVariants(@Query('productId') productId: string): Promise<{ variant: string[] }> {
    return await this.productVariantService.findVariantsByProductId(productId);
  }
}
