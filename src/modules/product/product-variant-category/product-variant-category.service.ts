import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProductVariantCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async findCategoriesByProductId(productId: string): Promise<{ categories: string[] }> {
    const variants = await this.prisma.productVariant.findMany({
      where: { productId },
      select: { category: true },
      distinct: ['category'],
    });

    const categories = variants.map(v => v.category).filter(Boolean);
    return { categories };
  }
}
