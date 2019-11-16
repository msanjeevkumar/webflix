import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

// tslint:disable-next-line: no-var-requires
require('dotenv').config();
async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      port: Number(process.env.GENRES_PORT),
    },
  });

  await app.listenAsync();
}
bootstrap();
