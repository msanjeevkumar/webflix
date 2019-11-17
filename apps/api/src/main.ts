import * as dotenv from 'dotenv';
dotenv.config();
import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { AllExceptionsFilter } from './http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.connectMicroservice({
    transport: Transport.REDIS,
    options: {
      url: 'redis://localhost:6379',
    },
  });

  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(Number(process.env.API_PORT));
}
bootstrap();
