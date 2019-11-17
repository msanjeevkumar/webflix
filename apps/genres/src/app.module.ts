import { Module } from '@nestjs/common';
import { GenreModule } from './genre/genre.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, GenreModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
