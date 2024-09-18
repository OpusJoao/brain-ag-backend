import { registerAs } from '@nestjs/config';
import { join } from 'path';
import { DataSourceOptions } from 'typeorm';
console.log(join(__dirname, '../../../database/migrations/*{.ts,.js}'));
export default registerAs('database', (): DataSourceOptions => {
  return {
    type: process.env.DB_TYPE || 'postgres',
    host: process.env.DB_HOST || '',
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USERNAME || '',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'teste',
    entities: [join(__dirname, '../../../', '**', '*.entity.{ts,js}')],
    synchronize: false,
    migrationsTableName: 'migration',
    migrations: [join(__dirname, '../../../database/migrations/*{.ts,.js}')],
  } as DataSourceOptions;
});
