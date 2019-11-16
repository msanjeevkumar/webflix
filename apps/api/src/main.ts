import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { AllExceptionsFilter } from './http-exception.filter';

// tslint:disable-next-line: no-var-requires
require('dotenv').config();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.connectMicroservice({
    transport: Transport.TCP,
  });

  app.useGlobalFilters(new AllExceptionsFilter());
  await app.listen(Number(process.env.API_PORT));
}
bootstrap();
