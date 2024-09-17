import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import RuralProducerModule from './rural-producer/rural-producer.module';
import UtilsModule from './utils/utils.module';
import DashboardModule from './dashboard/dashboard.module';

@Module({
  imports: [UtilsModule, DatabaseModule, RuralProducerModule, DashboardModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
