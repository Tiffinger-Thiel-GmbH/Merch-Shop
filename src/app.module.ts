import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrdersModule } from './modules/orders/orders.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    OrdersModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'postgresdb',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'db',
      autoLoadEntities: true,
      synchronize: true,
    }),
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
