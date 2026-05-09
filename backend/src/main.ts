import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser = require('cookie-parser');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.setGlobalPrefix('api');

  app.enableCors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  });

  // Swagger документация
  const config = new DocumentBuilder()
    .setTitle('Astra Hotel API')
    .setDescription('API для системы бронирования отеля Astra')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(process.env.PORT || 7000);
  console.log(`Сервер запущен на порту ${process.env.PORT || 7000}`);
  console.log(`Swagger: http://localhost:${process.env.PORT || 7000}/api/docs`);
}
bootstrap();
