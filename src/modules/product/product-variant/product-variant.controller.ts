import { Controller, Get, Query } from '@nestjs/common';
import { ProductVariantService } from './product-variant.service';
import { ApiTags } from '@nestjs/swagger';
import { mapProductVariantDTO } from './mapper/product-variant-dto.mapper';
import { ProductVariantIncomingDTO } from './dto/product-variant-incoming.dto';
import { ProductVariantListDTO } from './dto/product-variant-list.dto';

@ApiTags('Product Variants')
@Controller('product-variant')
export class ProductVariantController {
  constructor(private readonly productVariantService: ProductVariantService) {}

  @Get('/variants')
  public async findVariants(@Query() query: ProductVariantIncomingDTO): Promise<ProductVariantListDTO> {
    const variants = await this.productVariantService.findVariantsByProductId(query.productId);
    return {
      items: variants.map(mapProductVariantDTO),
    };
  }
}
