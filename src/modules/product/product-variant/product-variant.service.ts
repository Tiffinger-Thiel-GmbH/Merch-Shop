import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ProductVariant } from '../../../generated/prisma/client';

@Injectable()
export class ProductVariantService {
  constructor(private readonly prisma: PrismaService) {}

  public async findVariantsByProductId(productId: string, category?: string): Promise<ProductVariant[]> {
    return await this.prisma.productVariant.findMany({
      where: {
        productId,
        category,
      },
      orderBy: [{ category: 'asc' }, { name: 'asc' }, { id: 'asc' }],
    });
  }
}
