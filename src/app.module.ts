import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ProductModule } from './modules/product/products/product.module';
import { ProductVariantCategoryModule } from './modules/product/product-variant-category/product-variant-category.module';
import { ProductVariantModule } from './modules/product/product-variant/product-variant.module';
import { OrderModule } from './modules/order/order.module';
import { UserModule } from './modules/user/user.module';
import { MailModule } from './modules/mail/mail.module';
import { AssetsModule } from './modules/assets/assets.module';
import { LoggingMiddleware } from './modules/logging/loggingMiddleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    PrismaModule,
    ProductModule,
    OrderModule,
    ProductVariantCategoryModule,
    ProductVariantModule,
    UserModule,
    MailModule,
    AssetsModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggingMiddleware).forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
