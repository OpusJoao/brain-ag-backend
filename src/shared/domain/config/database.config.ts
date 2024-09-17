import { registerAs } from '@nestjs/config';
import { join } from 'path';
import { DataSourceOptions } from 'typeorm';

export default registerAs('database', (): DataSourceOptions => {
  return {
    type: process.env.DB_TYPE || 'postgres',
    host: process.env.DB_HOST || '',
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USERNAME || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'teste',
    entities: [join(__dirname, '../../', '**', '*.entity.{ts,js}')],
    synchronize: false,
    migrationsTableName: 'migration',
    migrations: [join(__dirname, '../../database/migration/*{.ts,.js}')],
  } as DataSourceOptions;
});
