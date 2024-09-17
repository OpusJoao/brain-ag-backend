import { DataSource, DataSourceOptions } from 'typeorm';
import databaseConfig from '../shared/domain/config/database.config';

export const DATA_SOURCE = 'DATA_SOURCE';
export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async () => {
      const dataSourceOptions: DataSourceOptions = databaseConfig();
      const dataSource = new DataSource(dataSourceOptions);
      return dataSource.initialize();
    },
  },
];
