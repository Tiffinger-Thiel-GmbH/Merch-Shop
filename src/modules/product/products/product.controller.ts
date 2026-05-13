import { Controller, Get } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductListDTO } from './dtos/product-list.dto';
import { mapProductDTO } from './mappings/product-dto.mapper';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductService) {}

  @Get()
  public async findAll(): Promise<ProductListDTO> {
    const product = await this.productsService.findAll();
    return {
      items: product.map(mapProductDTO),
      totalCount: product.length,
    };
  }
}
