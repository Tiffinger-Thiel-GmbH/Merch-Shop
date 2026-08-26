import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './modules/prisma/prisma.module';
<<<<<<< HEAD
import { ProductModule } from './modules/products/product.module';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, ProductModule],
  controllers: [AppController],
  providers: [AppService],
=======
import { ProductModule } from './modules/product/products/product.module';
import { ProductVariantCategoryModule } from './modules/product/product-variant-category/product-variant-category.module';
import { ProductVariantModule } from './modules/product/product-variant/product-variant.module';
import { OrderModule } from './modules/order/order.module';
import { MailModule } from './modules/mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    ProductModule,
    OrderModule,
    ProductVariantCategoryModule,
    ProductVariantModule,
    MailModule,
  ],
>>>>>>> 384dcba (email versand und action link)
})
export class AppModule {}
