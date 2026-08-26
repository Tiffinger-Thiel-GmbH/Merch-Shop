import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
<<<<<<< HEAD

  const config = new DocumentBuilder().setTitle('API Title').setDescription('API Beschreibung').setVersion('1.0').build();
=======
  process.on('unhandledRejection', err => console.error(err));
  const config = new DocumentBuilder()
    .setTitle('Merch Shop Products & Orders')
    .setDescription('A full list of all routes for the T&T Merch Shop')
    .setVersion('1.0')
    .build();
>>>>>>> 384dcba (email versand und action link)
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
