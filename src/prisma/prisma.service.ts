// src/prisma/prisma.service.ts
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '../generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { CreatePrismaDto } from './dto/create-prisma.dto';
import { UpdatePrismaDto } from './dto/update-prisma.dto';

type ProductRecord = {
  id: string;
  name: string;
  size: string | null;
  description: string | null;
  createdAt: Date;
};

type ProductsDelegate = {
  create(args: { data: CreatePrismaDto }): Promise<ProductRecord>;
  findMany(): Promise<ProductRecord[]>;
  findUnique(args: { where: { id: string } }): Promise<ProductRecord | null>;
  update(args: { where: { id: string }; data: UpdatePrismaDto }): Promise<ProductRecord>;
  delete(args: { where: { id: string } }): Promise<ProductRecord>;
};

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  constructor() {
    super({
      adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
    });
  }
  async onModuleInit() {
    await this.$connect();
  }
  async onModuleDestroy() {
    await this.$disconnect();
  }

  private productsDelegate(): ProductsDelegate {
    const prismaClient = this as unknown as { products: ProductsDelegate };
    return prismaClient.products;
  }

  create(createPrismaDto: CreatePrismaDto) {
    return this.productsDelegate().create({
      data: createPrismaDto,
    });
  }

  findAll() {
    return this.productsDelegate().findMany();
  }

  findOne(id: string) {
    return this.productsDelegate().findUnique({
      where: { id },
    });
  }

  update(id: string, updatePrismaDto: UpdatePrismaDto) {
    return this.productsDelegate().update({
      where: { id },
      data: updatePrismaDto,
    });
  }

  remove(id: string) {
    return this.productsDelegate().delete({
      where: { id },
    });
  }
}
