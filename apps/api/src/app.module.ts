import { Module } from '@nestjs/common';
import { GenreController } from './genre/genre.controller';
import { MovieController } from './movie/movie.controller';

@Module({
  imports: [],
  controllers: [GenreController, MovieController],
  providers: [],
})
export class AppModule {}
