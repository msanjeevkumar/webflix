import { Sequelize } from 'sequelize-typescript';
import { Movie } from './movie.entity';

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async () => {
      const sequelize = new Sequelize(process.env.MOVIES_DB_URL, {
        repositoryMode: true,
        logging: false,
      });
      sequelize.addModels([Movie]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
