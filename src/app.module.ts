import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ProductModule } from './modules/product/products/product.module';
import { OrderModule } from './modules/order/order.module';
import { ProductVariantCategoryModule } from './modules/product/product-variant-category/product-variant-category.module';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, ProductModule, OrderModule, ProductVariantCategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
