import { Module } from '@nestjs/common';
import { GenreController } from './genre.controller';
import { DatabaseModule } from '../database/database.module';
import { GenreService } from './genre.service';

@Module({
  imports: [DatabaseModule],
  providers: [GenreService],
  controllers: [GenreController],
  exports: [GenreService],
})
export class GenreModule {}
