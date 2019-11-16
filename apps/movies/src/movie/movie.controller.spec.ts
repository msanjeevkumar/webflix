import { Test, TestingModule } from '@nestjs/testing';
import { MovieController } from './movie.controller';

describe('Movie Controller', () => {
  let controller: MovieController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MovieController],
    }).compile();

    controller = module.get<MovieController>(MovieController);
  });

  it('should be defined', async () => {
    const movies = await controller.getAllMovies({});
    expect(movies).toStrictEqual([]);
  });
});
