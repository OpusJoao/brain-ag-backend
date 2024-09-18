import { ConfigModule } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import databaseConfig from '../shared/domain/config/database.config';

ConfigModule.forRoot({
  isGlobal: true,
  load: [databaseConfig],
});
const dados: DataSourceOptions = databaseConfig();
const dataSourceMigration = new DataSource(dados);
export default dataSourceMigration;
