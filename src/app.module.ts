import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ProductModule } from './modules/product/products/product.module';
import { ProductVariantCategoryModule } from './modules/product/product-variant-category/product-variant-category.module';
import { ProductVariantModule } from './modules/product/product-variant/product-variant.module';
import { OrderModule } from './modules/order/order.module';
import { AssetsModule } from './modules/assets/assets.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    ProductModule,
    OrderModule,
    ProductVariantCategoryModule,
    ProductVariantModule,
    AssetsModule,
  ],
})
export class AppModule {}
