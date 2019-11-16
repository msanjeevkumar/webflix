import { Module } from '@nestjs/common';
import { MovieModule } from './movie/movie.module';

import { Movie } from './database/movie.entity';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule, MovieModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
