import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder().setTitle('API Title').setDescription('API Beschreibung').setVersion('1.0').build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.enableShutdownHooks();
  await app.listen(process.env.PORT ?? 3000);
  const url = await app.getUrl();
  const swaggerUrl = url.endsWith('/') ? `${url}api` : `${url}/api`;
  console.log(`Swagger UI is running on port: ${swaggerUrl}`);
}

void bootstrap();
