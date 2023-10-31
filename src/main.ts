import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import moment from 'moment-timezone';
import { useContainer } from 'class-validator';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  /* Swagger config */
  const config = new DocumentBuilder()
    .setTitle('E-Commerce Source API')
    .setDescription('The E-Commerce Source API description')
    .setVersion('1.0')
    .addBearerAuth()
    .addSecurityRequirements('bearer')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.useStaticAssets(join(__dirname, '..', 'public'), {
		prefix: '/public/',
	});

  await app
    .listen(process.env.PORT)
    .then(() => {
      console.log(
        `Application is running on: Swagger UI: http://localhost:${process.env.PORT}/api`,
      );
    })
    .catch((err) => {
      console.error(err);
    });
}
bootstrap();
