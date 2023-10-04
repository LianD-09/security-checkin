import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug'],
  });
  const logger = new Logger('StarApplication');

  await app.listen(process.env.PORT, () => {
    logger.log(
      `🚀 🙄😳🙄 GraphQL Service start at http://localhost:${process.env.PORT}/graphql`,
    );
  });
}
bootstrap();
