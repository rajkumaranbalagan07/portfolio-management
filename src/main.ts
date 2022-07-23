import { AppLogger } from './lib/helper/logger';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { httpLogger } from './lib/helper/http.logger';
import { json } from 'express';
const logger = new AppLogger();

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {});

  app.setGlobalPrefix('/api/portfolio-management/v1');

  app.use(httpLogger);
  // app.use(helmet);
  app.enableCors();
  app.use(json({ limit: '50mb' }));

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidUnknownValues: true,
      stopAtFirstError: true,
    }),
  );

  await app.listen(process.env.PORT || 3000, '0.0.0.0');
  console.log('Application running at', await app.getUrl());
}
bootstrap();
