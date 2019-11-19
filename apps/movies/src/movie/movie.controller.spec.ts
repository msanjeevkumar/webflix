import { Test, TestingModule } from '@nestjs/testing';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { RpcException } from '@nestjs/microservices';
import { movieRepository } from '../database/movies.providers';
import { MOVIE_REPOSITORY } from '@webflix/common/constants';
import * as dotenv from 'dotenv';
import { CreateMovieDto } from './CreateMovie.dto';

dotenv.config();

describe('Movie Controller', () => {
  let moviesController: MovieController;
  let movieService: MovieService;
  const movieRepositoryMock = {
    findAll: () => [],
    create: movie => ({ id: 1, ...movie }),
    findOne: ({ where: { id } }) => {
      if (id === 100) {
        throw new RpcException('No movie found with id 100');
      } else {
        return {
          id,
          name: 'test-name1',
          description: 'test-description',
          releaseDate: new Date(),
          durationInMins: 180,
          genres: [],
          rating: 5,
        };
      }
    },
    destroy: ({ where: { id } }) => Promise.resolve(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [],
      controllers: [MovieController],
      providers: [MovieService, ...movieRepository],
    })
      .overrideProvider('MOVIE_REPOSITORY')
      .useValue(movieRepositoryMock)
      .compile();

    movieService = module.get<MovieService>(MovieService);
    moviesController = module.get<MovieController>(MovieController);
  });

  it('should get all movies in database successfully', async () => {
    // Arrange

    expect(await moviesController.getAllMovies()).toStrictEqual([]);
  });

  it('should return error while trying to get movie by id', async () => {
    try {
      const movie = await moviesController.getMovie({ id: 100 });
    } catch (e) {
      expect(e.message).toBe('No movie found with id 100');
    }
  });

  it('should be get movie by id', async () => {
    const movie = await moviesController.getMovie({ id: 1 });
    expect(movie.id).toBe(1);
    expect(movie.description).toStrictEqual(movie.description);
    expect(movie.releaseDate).toStrictEqual(movie.releaseDate);
    expect(movie.durationInMins).toStrictEqual(movie.durationInMins);
    expect(movie.rating).toStrictEqual(movie.rating);
  });

  it('should create movie in the db', async () => {
    const movie: CreateMovieDto = {
      name: 'test-name1',
      description: 'test-description',
      releaseDate: new Date(),
      durationInMins: 180,
      genres: [],
      rating: 5,
    };

    const movieFromDb = await moviesController.insertMovie(movie);

    expect(movieFromDb.id).toBeTruthy();
    expect(movieFromDb.description).toStrictEqual(movie.description);
    expect(movieFromDb.releaseDate).toStrictEqual(movie.releaseDate);
    expect(movieFromDb.durationInMins).toStrictEqual(movie.durationInMins);
    expect(movieFromDb.rating).toStrictEqual(movie.rating);
  });

  it('should delete movie from the db', async () => {
    await moviesController.deleteMovie({ id: 1 });
  });
});
