// prisma/seed.ts
import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';
import { ordersData, ordersItemData, productsData, userData } from './seed-data';

const connectionString = process.env.DATABASE_URL!;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main(): Promise<void> {
  for (const data of productsData) {
    await prisma.product.upsert({
      where: { id: data.id },
      update: data,
      create: data,
    });
  }

  for (const data of userData) {
    await prisma.user.upsert({
      where: { id: data.id },
      update: data,
      create: data,
    });
  }

  for (const data of ordersData) {
    await prisma.order.upsert({
      where: { id: data.id },
      update: data,
      create: data,
    });
  }
  for (const data of ordersItemData) {
    await prisma.orderItem.upsert({
      where: { id: data.id },
      update: data,
      create: data,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
