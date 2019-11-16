import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { GET_GENRES } from '@webflix/common/constants';

@Controller()
export class GenreController {
  @EventPattern(GET_GENRES)
  async getAllGenres(data: object): Promise<string[]> {
    return Promise.resolve([]);
  }
}
