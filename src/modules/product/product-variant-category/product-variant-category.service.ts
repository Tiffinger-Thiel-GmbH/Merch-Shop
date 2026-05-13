import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ProductVariantCategory } from './entities/product-variant-category.entity';

@Injectable()
export class ProductVariantCategoryService {
  constructor(private prisma: PrismaService) {}
  async findByCategory(category: ProductVariantCategoryService): Promise<ProductVariantCategory> {
    return `This action returns all productVariantCategory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} productVariantCategory`;
  }
}
