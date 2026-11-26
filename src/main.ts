import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExecutionContext, Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: [process.env.CORS_ORIGIN] });
  app.useGlobalGuards({
    canActivate: (req: ExecutionContext) => {
      const request: Request = req.switchToHttp().getRequest();
      return /^.{4,}$/.test(`${request.headers['x-user-id']}`);
    },
  });
  process.on('unhandledRejection', err => console.error(err));
  const config = new DocumentBuilder()
    .setTitle('Merch Shop Products & Orders')
    .setDescription('A full list of all routes for the T&T Merch Shop')
    .setVersion('1.0')
    .addGlobalParameters({
      name: 'x-user-id',
      in: 'header',
      required: true,
      schema: { type: 'string', format: 'uuid' },
    })
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
