import { Sequelize, Repository } from 'sequelize-typescript';
import { Movie } from './movie.entity';

export const movieRepository = [
  {
    provide: 'MOVIE_REPOSITORY',
    useFactory: (connection: Sequelize): Repository<Movie> => connection.getRepository(Movie),
    inject: ['DATABASE_CONNECTION'],
  },
];
