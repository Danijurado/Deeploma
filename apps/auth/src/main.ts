import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const options = {
    origin: configService.get('ORIGIN'),
    credentials: true,
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
  };
  app.enableCors(options);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());

  await app.listen(configService.get('PORT') || 3000);
}

bootstrap();
