import { Test, TestingModule } from '@nestjs/testing';
import { GenreController } from './genre.controller';

describe('Genre Controller', () => {
  let controller: GenreController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenreController],
    }).compile();

    controller = module.get<GenreController>(GenreController);
  });

  it('should be defined', async () => {
    const data = await controller.getAllGenres({});
    expect(data).toStrictEqual([]);
  });
});
