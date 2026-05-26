import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProductVariantService {
  constructor(private readonly prisma: PrismaService) {}

  async findVariantsByProductId(productId: string): Promise<{ variant: string[] }> {
    const variants = await this.prisma.productVariant.findMany({
      where: { productId },
      select: { category: true, name: true },
      distinct: ['category', 'name'],
    });
    console.log(variants);

    const variant = variants.map(v => v.category).filter(Boolean);
    return { variant };
  }
}
