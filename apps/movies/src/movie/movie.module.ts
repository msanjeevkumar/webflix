import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { Movie } from '../database/movie.entity';
import { MovieService } from './movie.service';
import { databaseProviders } from '../database/movie-db.provider';
import { DatabaseModule } from '../database/database.module';
import { movieRepository } from '../database/movies.providers';

@Module({
  imports: [DatabaseModule],
  providers: [MovieService],
  controllers: [MovieController],
  exports: [MovieService],
})
export class MovieModule {}
