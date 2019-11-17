import * as dotenv from 'dotenv';
dotenv.config();
import { Test, TestingModule } from '@nestjs/testing';
import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';
import { RpcException } from '@nestjs/microservices';
import { genreRepository } from '../database/genres.providers';

describe('Genre Controller', () => {
  let genresController: GenreController;
  let genreService: GenreService;
  const genreRepositoryMock = {
    findAll: () => [],
    create: genre => ({ id: 1, ...genre }),
    findOne: ({ where: { id } }) => {
      if (id === 100) {
        throw new RpcException('No genre found with id 100');
      } else {
        return {
          id,
          name: 'test-name1',
          description: 'test-description',
        };
      }
    },
    destroy: ({ where: { id } }) => Promise.resolve(),
  };

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [],
      controllers: [GenreController],
      providers: [GenreService, ...genreRepository],
    })
      .overrideProvider('GENRE_REPOSITORY')
      .useValue(genreRepositoryMock)
      .compile();

    genreService = module.get<GenreService>(GenreService);
    genresController = module.get<GenreController>(GenreController);
  });

  it('should get all genres in database successfully', async () => {
    // Arrange

    expect(await genresController.getAllGenres()).toStrictEqual([]);
  });

  it('should return error while trying to get genre by id', async () => {
    try {
      const genre = await genresController.getGenre({ id: 100 });
    } catch (e) {
      expect(e.message).toBe('No genre found with id 100');
    }
  });

  it('should be get genre by id', async () => {
    const genre = await genresController.getGenre({ id: 1 });
    expect(genre.id).toBe(1);
    expect(genre.description).toStrictEqual(genre.description);
  });

  it('should create genre in the db', async () => {
    const genre = {
      name: 'test-name1',
      description: 'test-description',
    };

    const genreFromDb = await genresController.insertGenre(genre);

    expect(genreFromDb.id).toBeTruthy();
    expect(genreFromDb.description).toStrictEqual(genre.description);
  });

  it('should delete genre from the db', async () => {
    await genresController.deleteGenre({ id: 1 });
  });
});
