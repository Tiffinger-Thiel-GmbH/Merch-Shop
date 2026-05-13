import { Module } from '@nestjs/common';
import { ProductVariantCategoryService } from './product-variant-category.service';
import { ProductVariantCategoryController } from './product-variant-category.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  imports: [PrismaService],
  controllers: [ProductVariantCategoryController],
  providers: [ProductVariantCategoryService],
})
export class ProductVariantCategoryModule {}
