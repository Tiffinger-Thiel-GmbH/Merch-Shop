import { Controller, Get } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductListDTO } from './dtos/products-list.dto';
import { mapProductDTO } from './mappings/product-dto.mapper';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  public async findAll(): Promise<ProductListDTO> {
    const products = await this.productsService.findAll();
    return {
      items: products.map(mapProductDTO),
      totalCount: products.length,
    };
  }
}
