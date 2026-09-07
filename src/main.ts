import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.ALLOWED_HOST,
    methods: 'GET, PATCH, POST',
    maxAge: 30000,
  });
  const config = new DocumentBuilder()
    .setTitle('Merch Shop Products & Orders')
    .setDescription('A full list of all routes for the T&T Merch Shop')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableShutdownHooks();
  await app.listen(process.env.PORT ?? 3000);
  const url = await app.getUrl();
  Logger.log(`Swagger UI is running at: ${url}/api`);
}

void bootstrap();
