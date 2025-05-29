import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe, Logger } from '@nestjs/common';
import * as basicAuth from 'express-basic-auth';
import { AppConfigService } from 'src/config/app/config.service';
import * as cookieParser from 'cookie-parser';
import { json } from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(AppConfigService);
  const logger = new Logger('Bootstrap');

  app.use(cookieParser());
  app.use(json());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  //Swagger 암호화 .env development시 개방형열람, 배포이후 production으로 설정시 암호화열람
  if (configService.dev !== 'development') {
    app.use(
      ['/docs'],
      basicAuth({
        users: { admin: 'weatherlink123' },
        challenge: true,
        unauthorizedResponse: () => 'Unauthorized',
      }),
    );
  }

  // Swagger 설정
  const config = new DocumentBuilder()
    .setTitle('UMO API')
    .setDescription('UMO API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addServer('api/v1')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.setGlobalPrefix('api/v1', {
    exclude: ['health'],
  });

  // Swagger JSON 파일로 저장
  const fs = require('fs');
  fs.writeFileSync(
    './src/docs/swagger/swagger-spec.json',
    JSON.stringify(document),
  );
  await app.listen(process.env.PORT ?? 3001, '0.0.0.0');
}
bootstrap();
