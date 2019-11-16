import { NestFactory, HttpAdapterHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

// tslint:disable-next-line: no-var-requires
require('dotenv').config();
async function bootstrap() {
  // tslint:disable-next-line: no-console
  console.log(process.env.MOVIE_DB_URL + '----------------------------');
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.TCP,
    options: {
      port: Number(process.env.MOVIE_PORT),
    },
  });

  await app.listenAsync();
}
bootstrap();
