import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductVariantCategoryService } from './product-variant-category.service';
import { CreateProductVariantCategoryDto } from './dto/create-product-variant-category.dto';
import { UpdateProductVariantCategoryDto } from './dto/update-product-variant-category.dto';

@Controller('product-variant-category')
export class ProductVariantCategoryController {
  constructor(private readonly productVariantCategoryService: ProductVariantCategoryService) {}

  @Post()
  create(@Body() createProductVariantCategoryDto: CreateProductVariantCategoryDto) {
    return this.productVariantCategoryService.create(createProductVariantCategoryDto);
  }

  @Get()
  findAll() {
    return this.productVariantCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productVariantCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductVariantCategoryDto: UpdateProductVariantCategoryDto) {
    return this.productVariantCategoryService.update(+id, updateProductVariantCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productVariantCategoryService.remove(+id);
  }
}
