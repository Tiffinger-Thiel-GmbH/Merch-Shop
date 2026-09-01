import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductListDTO } from './dtos/product-list.dto';
import { mapProductDTO } from './mappings/product-dto.mapper';
import { ProductDTO } from './dtos/product.dto';

@Controller('product')
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
  @Get(':id')
  public async findOneById(@Param('id') id: string): Promise<ProductDTO> {
    const product = await this.productsService.findOneById(id);
    return mapProductDTO(product);
  }
}
