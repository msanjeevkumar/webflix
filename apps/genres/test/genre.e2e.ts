import * as dotenv from 'dotenv';
dotenv.config();
import { Test, TestingModule } from '@nestjs/testing';
import { GenreService } from '../src/genre/genre.service';
import { Repository } from 'sequelize-typescript';
import { Genre } from '../src/database/genre.entity';
import { DatabaseModule } from '../src/database/database.module';
import { GenreModule } from '../src/genre/genre.module';
import { GenreController } from '../src/genre/genre.controller';

describe('Genre end to end tests', () => {
  let genresController: GenreController;
  let genreService: GenreService;
  let genreRepository: Repository<Genre>;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [DatabaseModule, GenreModule],
      controllers: [],
      providers: [],
    }).compile();

    genreService = module.get<GenreService>(GenreService);
    genresController = module.get<GenreController>(GenreController);
    genreRepository = module.get('GENRE_REPOSITORY');
  });

  it('should get all genres in database successfully', async () => {
    // Arrange
    const genres = await genreRepository.findAll();

    expect(await genresController.getAllGenres()).toStrictEqual(genres);
  });

  it('should return error while trying to get genre by id', async () => {
    try {
      const genre = await genresController.getGenre({ id: 100 });
    } catch (e) {
      expect(e.message).toBe('No entity found with id 100');
    }
  });

  it('should be get genre by id', async () => {
    const today = new Date();
    const genreObj = await genreRepository.create({
      name: 'test-name1',
      description: 'test-description',
    });

    const genre = await genresController.getGenre({ id: genreObj.id });

    // Assert
    expect(genreObj.id).toStrictEqual(genre.id);
    expect(genreObj.description).toStrictEqual(genre.description);
    await genreRepository.destroy({ where: { id: genreObj.id } });
  });

  it('should create genre in the db', async () => {
    const genre = {
      name: 'test-name1',
      description: 'test-description',
      releaseDate: new Date(),
      durationInMins: 180,
      genres: [],
      rating: 5,
    };

    const genreFromDb = await genresController.insertGenre(genre);

    expect(genreFromDb.id).toBeTruthy();
    expect(genreFromDb.description).toStrictEqual(genre.description);
    await genreRepository.destroy({
      where: {
        id: genreFromDb.id,
      },
    });
  });

  it('should delete genre from the db', async () => {
    const genre = {
      name: 'test-name1',
      description: 'test-description',
    };

    const genreFromDb = await genreRepository.create(genre);

    await genresController.deleteGenre({ id: genreFromDb.id });

    expect(await genreRepository.findByPk(genreFromDb.id)).toBeFalsy();
  });
});
