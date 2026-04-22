import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Product } from '../../generated/prisma/client';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  public async findAll(): Promise<Product[]> {
    return await this.prisma.product.findMany();
  }
}
