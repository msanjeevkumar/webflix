import { Injectable, Inject } from '@nestjs/common';
import { BaseService } from '@webflix/common';
import { Repository } from 'sequelize-typescript';
import { Genre } from '../database/genre.entity';

@Injectable()
export class GenreService extends BaseService<Genre> {
  constructor(@Inject('GENRE_REPOSITORY') private readonly genreRepository: Repository<Genre>) {
    super(genreRepository);
  }
}
