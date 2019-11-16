import { Controller, Get } from '@nestjs/common';
import { Client, Transport, ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { GET_MOVIES } from '@webflix/common/constants';

@Controller('movies')
export class MovieController {
  @Client({
    transport: Transport.TCP,
  })
  client: ClientProxy;

  @Get()
  findAll(): Observable<string[]> {
    return this.client.send<string[]>(GET_MOVIES, 'get list movies');
  }
}
