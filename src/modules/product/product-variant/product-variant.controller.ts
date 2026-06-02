import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { ProductVariantService } from './product-variant.service';
import { mapProductVariantDTO } from './mapper/product-variant-dto.mapper';
import { ProductVariantIncomingDTO } from './dto/product-variant-incoming.dto';
import { ProductVariantListDTO } from './dto/product-variant-list.dto';

@ApiTags('Product Variants')
@Controller('/product')
export class ProductVariantController {
  constructor(private readonly productVariantService: ProductVariantService) {}

  @Get('/:productId/variant')
  @ApiParam({
    name: 'productId',
    required: true,
    type: String,
    example: '22222222-2222-4222-8222-222222222222',
  })
  public async findVariants(
    @Param('productId') productId: string,
    @Query() query: ProductVariantIncomingDTO,
  ): Promise<ProductVariantListDTO> {
    const variants = await this.productVariantService.findVariantsByProductId(productId, query.category);
    return {
      items: variants.map(mapProductVariantDTO),
    };
  }
}
