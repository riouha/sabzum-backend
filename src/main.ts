import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  app.enableCors();
  app.use(
    helmet({
      crossOriginResourcePolicy: false,
      contentSecurityPolicy: false,
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      // transformOptions: { enableImplicitConversion: true },
      // exceptionFactory: InputValidationExceptionFactory,
    }),
  );

  const options = new DocumentBuilder()
    .setTitle('API DOCUMENTATION')
    .setDescription('Description')
    .setVersion('1.0')
    // .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'jwt' }, 'UserToken')
    .addBearerAuth(
      {
        name: 'Admin Bearer Token',
        type: 'oauth2',
        scheme: 'bearer',
        flows: {
          password: {
            tokenUrl: '/admin/auth/login',
            scopes: {},
          },
        },
      },
      'AdminBearerToken',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api/dox!', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      // tagsSorter: 'alpha',
      // operationsSorter: 'alpha',
      // docExpansion: 'none',
    },
  });

  const port = configService.get('PORT');
  await app.listen(port);
  console.info('----------------------------------------------------------------');
  console.info(`| Server started on: http://localhost:${port}                  |`);
  console.info(`| Swagger URL:       http://localhost:${port}/api/dox!/ |`);
  console.info('----------------------------------------------------------------');
}
bootstrap();
