import { Module } from '@nestjs/common';
import { GenreController } from './genre/genre.controller';
import { MovieController } from './movie/movie.controller';

@Module({
  imports: [],
  controllers: [GenreController],
  providers: [],
})
export class AppModule {}
