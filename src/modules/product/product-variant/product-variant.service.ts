import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ProductVariantOutgoingDTO } from './dto/product-variant-outgoing.dto';

@Injectable()
export class ProductVariantService {
  constructor(private readonly prisma: PrismaService) {}

  public async findVariantsByProductId(productId: string): Promise<ProductVariantOutgoingDTO[]> {
    return await this.prisma.productVariant.findMany({
      where: { productId },
      select: {
        category: true,
        name: true,
      },
      orderBy: [{ category: 'asc' }, { name: 'asc' }, { id: 'asc' }],
    });
  }
}
