import { Controller, Inject } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { GET_MOVIES, GET_MOVIE, DELETE_MOVIE, CREATE_MOVIE } from '@webflix/common/constants';
import { Movie } from '../database/movie.entity';
import { MovieService } from './movie.service';

export class MovieController {
  constructor(@Inject(MovieService) private readonly movieService: MovieService) {}

  @MessagePattern(GET_MOVIES)
  async getAllMovies(): Promise<Movie[]> {
    return this.movieService.getAll();
  }

  @MessagePattern(GET_MOVIE)
  async getMovie({ id }): Promise<Movie> {
    return this.movieService.get(id);
  }

  @MessagePattern(CREATE_MOVIE)
  async insertMovie({ name, description, releaseDate, durationInMins, genres, rating }) {
    if (!genres) {
      genres = [];
    }

    return this.movieService.create({ name, description, releaseDate, durationInMins, genres, rating });
  }

  @MessagePattern(DELETE_MOVIE)
  async deleteMovie({ id }) {
    return this.movieService.delete(id);
  }
}
