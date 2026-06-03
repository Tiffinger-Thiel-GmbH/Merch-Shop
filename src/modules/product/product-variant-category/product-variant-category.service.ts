import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ProductVariantCategoriesDTO } from './dto/product-variant-categories.dto';

@Injectable()
export class ProductVariantCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async findCategoriesByProductId(productId: string): Promise<ProductVariantCategoriesDTO> {
    const variants = await this.prisma.productVariant.findMany({
      where: { productId },
      select: { category: true },
      distinct: ['category'],
      orderBy: { category: 'asc' },
    });

    const categories = variants.map(v => v.category);
    return { categories };
  }
}
