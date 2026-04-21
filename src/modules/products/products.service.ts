import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Products } from '../../generated/prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  public async findAll(): Promise<Products[]> {
    return this.prisma.products.findMany();
  }
}
