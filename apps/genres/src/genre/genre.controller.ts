import { Controller, Inject } from '@nestjs/common';
import { MessagePattern, EventPattern } from '@nestjs/microservices';
import { GET_GENRES, GET_GENRE, CREATE_GENRE, DELETE_GENRE } from '@webflix/common/constants';
import { Genre } from '../database/genre.entity';
import { GenreService } from './genre.service';

export class GenreController {
  constructor(@Inject(GenreService) private readonly genreService: GenreService) {}

  @EventPattern(GET_GENRES)
  async getAllGenres(): Promise<Genre[]> {
    return this.genreService.getAll();
  }

  @MessagePattern(GET_GENRE)
  async getGenre({ id }): Promise<Genre> {
    return this.genreService.get(id);
  }

  @EventPattern(CREATE_GENRE)
  async insertGenre({ name, description }) {
    return this.genreService.create({ name, description });
  }

  @EventPattern(DELETE_GENRE)
  async deleteGenre({ id }) {
    return this.genreService.delete(id);
  }
}
