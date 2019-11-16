import { Injectable, Inject } from '@nestjs/common';
import { Movie } from '../database/movie.entity';
import { BaseService } from '@webflix/common';
import { Repository } from 'sequelize-typescript';

@Injectable()
export class MovieService extends BaseService<Movie> {
  constructor(@Inject('MOVIE_REPOSITORY') private readonly movieRepository: Repository<Movie>) {
    super(movieRepository);
  }
}
