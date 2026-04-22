import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductsController } from './product.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ProductsController],
  providers: [ProductService],
})
export class ProductModule {}
