import { Module } from '@nestjs/common';
import { databaseProviders } from './movie-db.provider';
import { movieRepository } from './movies.providers';

@Module({
  providers: [...databaseProviders, ...movieRepository],
  exports: [...databaseProviders, ...movieRepository],
})
export class DatabaseModule {}
