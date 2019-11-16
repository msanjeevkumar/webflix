import { Sequelize } from 'sequelize-typescript';
import { Genre } from './genre.entity';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => {
      const sequelize = new Sequelize(process.env.GENRES_DB_URL, {
        repositoryMode: true,
        logging: true,
      });
      sequelize.addModels([Genre]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
