import { Controller, Get, Param, Res, HttpStatus, Post, Body, Delete } from '@nestjs/common';
import { Client, Transport, ClientProxy } from '@nestjs/microservices';
import { Observable, from } from 'rxjs';
import { GET_MOVIES, GET_MOVIE, CREATE_MOVIE, DELETE_MOVIE } from '@webflix/common/constants';
import { Movie } from 'apps/movies/src/database/movie.entity';
import { CreateMovieDto } from './CreateMovie.dto';

@Controller('movies')
export class MovieController {
  @Client({
    transport: Transport.TCP,
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
