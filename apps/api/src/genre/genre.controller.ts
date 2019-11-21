import { Controller, Get, Param, Delete, Post, Body } from '@nestjs/common';
import { Client, Transport, ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { GET_GENRES, GET_GENRE, DELETE_GENRE, CREATE_GENRE } from '@webflix/common/constants';
import { Genre } from 'apps/genres/src/database/genre.entity';
import { ApiImplicitQuery, ApiUseTags, ApiImplicitParam } from '@nestjs/swagger';
import { CreateGenreDto } from 'apps/genres/src/genre/CreateGenre.dto';

@Controller('genres')
@ApiUseTags('genres')
export class GenreController {
  @Client({
    transport: Transport.REDIS,
    options: {
      url: process.env.REDIS_URL,
    },
  })
  client: ClientProxy;

  @Get()
  getGenres(): Observable<Genre[]> {
    return this.client.send<Genre[]>(GET_GENRES, {});
  }

  @Get('/:id')
  @ApiImplicitParam({ name: 'id', type: 'number' })
  async getGenre(@Param('id') id) {
    return this.client.send<Genre>(GET_GENRE, { id });
  }

  @Delete('/:id')
  @ApiImplicitParam({ name: 'id', type: 'number' })
  async deleteGenre(@Param('id') id) {
    return this.client.send<Genre>(DELETE_GENRE, { id });
  }

  @Post()
  async createGenre(@Body() createGenreDto: CreateGenreDto) {
    return this.client.send<Genre>(CREATE_GENRE, createGenreDto);
  }
}
