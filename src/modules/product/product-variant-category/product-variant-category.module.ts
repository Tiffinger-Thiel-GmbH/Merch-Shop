import { Module } from '@nestjs/common';
import { ProductVariantCategoryService } from './product-variant-category.service';
import { ProductVariantCategoryController } from './product-variant-category.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [ProductVariantCategoryController],
  providers: [ProductVariantCategoryService, PrismaService],
})
export class ProductVariantCategoryModule {}
