import { Module } from '@nestjs/common';
import { databaseProviders } from './genre-db.provider';
import { genreRepository } from './genres.providers';
@Module({
  providers: [...databaseProviders, ...genreRepository],
  exports: [...databaseProviders, ...genreRepository],
})
export class DatabaseModule {}
