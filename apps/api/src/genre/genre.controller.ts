import { Controller, Get } from '@nestjs/common';
import { Client, Transport, ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { GET_GENRES } from '@webflix/common/constants';

@Controller('genres')
export class GenreController {
  @Client({
    transport: Transport.TCP,
  })
  client: ClientProxy;

  @Get()
  findAll(): Observable<string[]> {
    return this.client.send<string[]>(GET_GENRES, 'get list genres');
  }
}
