import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.connectMicroservice({
    transport: Transport.TCP,
  });

  await app.listen(5000);
}
bootstrap();
