import { Test, TestingModule } from '@nestjs/testing';
import { RpcException } from '@nestjs/microservices';
import * as sinon from 'sinon';
import { MovieService } from '../src/movie/movie.service';
import { Repository } from 'sequelize-typescript';
import { Movie } from '../src/database/movie.entity';
import { DatabaseModule } from '../src/database/database.module';
import { MovieModule } from '../src/movie/movie.module';
import { MovieController } from '../src/movie/movie.controller';

require('dotenv').config();
describe('Movie Controller', () => {
  let moviesController: MovieController;
  let movieService: MovieService;
  let movieRepository: Repository<Movie>;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [DatabaseModule, MovieModule],
      controllers: [],
      providers: [],
    }).compile();

    movieService = module.get<MovieService>(MovieService);
    moviesController = module.get<MovieController>(MovieController);
    movieRepository = module.get('MOVIE_REPOSITORY');
  });

  it('should get all movies in database successfully', async () => {
    // Arrange
    const movies = await movieRepository.findAll();

    expect(await moviesController.getAllMovies()).toStrictEqual(movies);
  });

  it('should return error while trying to get movie by id', async () => {
    try {
      const movie = await moviesController.getMovie({ id: 100 });
    } catch (e) {
      expect(e.message).toBe('No movie found with id 100');
    }
  });

  it('should be get movie by id', async () => {
    const today = new Date();
    const movieObj = await movieRepository.create({
      name: 'test-name1',
      description: 'test-description',
      releaseDate: today,
      durationInMins: 180,
      rating: 5,
    });

    const movie = await moviesController.getMovie({ id: movieObj.id });

    // Assert
    expect(movieObj.id).toStrictEqual(movie.id);
    expect(movieObj.description).toStrictEqual(movie.description);
    expect(movieObj.releaseDate).toStrictEqual(movie.releaseDate);
    expect(movieObj.durationInMins).toStrictEqual(movie.durationInMins);
    expect(movieObj.rating).toStrictEqual(movie.rating);
    await movieRepository.destroy({ where: { id: movieObj.id } });
  });

  it('should create movie in the db', async () => {
    const movie = {
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
    await movieRepository.destroy({
      where: {
        id: movieFromDb.id,
      },
    });
  });

  it('should delete movie from the db', async () => {
    const movie = {
      name: 'test-name1',
      description: 'test-description',
      releaseDate: new Date(),
      durationInMins: 180,
      genres: [],
      rating: 5,
    };

    const movieFromDb = await movieRepository.create(movie);

    await moviesController.deleteMovie({ id: movieFromDb.id });

    expect(await movieRepository.findByPk(movieFromDb.id)).toBeFalsy();
  });
});
