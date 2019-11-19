import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { CREATE_MOVIE, DELETE_MOVIE, GET_MOVIE, GET_MOVIES } from '@webflix/common/constants';
import { Movie } from 'apps/movies/src/database/movie.entity';
import { CreateMovieDto } from 'apps/movies/src/movie/CreateMovie.dto';

@Controller('movies')
export class MovieController {
  @Client({
    transport: Transport.REDIS,
    options: {
      url: process.env.REDIS_URL,
    },
  })
  client: ClientProxy;

  @Get()
  getMovies(): Observable<Movie[]> {
    return this.client.send<Movie[]>(GET_MOVIES, 'get list movies');
  }

  @Get('/:id')
  async getMovie(@Param('id') id) {
    return this.client.send<Movie>(GET_MOVIE, { id });
  }

  @Delete('/:id')
  async deleteMovie(@Param('id') id) {
    return this.client.send<Movie>(DELETE_MOVIE, { id });
  }

  @Post()
  async createMovie(@Body() createMovieDto: CreateMovieDto) {
    return this.client.send<Movie>(CREATE_MOVIE, createMovieDto);
  }
}
