import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug'],
  });
  const logger = new Logger('StarApplication');

  const config = new DocumentBuilder()
    .setTitle('Security Checkin')
    .setDescription('Security Checkin API')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  app.enableCors();
  await app.listen(process.env.PORT, () => {
    logger.log(
      `🚀 🙄😳🙄 GraphQL Service start at http://localhost:${process.env.PORT}/graphql`,
    );
  });
}
bootstrap();
