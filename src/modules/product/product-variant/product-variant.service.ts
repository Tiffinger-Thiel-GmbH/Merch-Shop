import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProductVariantService {
  constructor(private prisma: PrismaService) {}
  findOne(id: number) {
    return `This action returns a #${id} productVariant`;
  }
}
