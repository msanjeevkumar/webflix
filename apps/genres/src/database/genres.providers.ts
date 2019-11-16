import { Sequelize, Repository } from 'sequelize-typescript';
import { Genre } from './genre.entity';

export const genreRepository = [
  {
    provide: 'GENRE_REPOSITORY',
    useFactory: (connection: Sequelize): Repository<Genre> => connection.getRepository(Genre),
    inject: ['DATABASE_CONNECTION'],
  },
];
