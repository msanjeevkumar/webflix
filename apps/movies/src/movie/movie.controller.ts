import { Controller } from '@nestjs/common';
import { MessagePattern, EventPattern } from '@nestjs/microservices';
import { GET_MOVIES } from '@webflix/common/constants';

export class MovieController {
  @EventPattern(GET_MOVIES)
  async getAllMovies(data: object): Promise<string[]> {
    // tslint:disable-next-line: no-console
    console.log(data);
    return Promise.resolve([]);
  }
}
