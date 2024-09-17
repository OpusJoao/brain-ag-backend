import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import RuralProducerModule from './rural-producer/rural-producer.module';
import UtilsModule from './utils/utils.module';

@Module({
  imports: [UtilsModule, DatabaseModule, RuralProducerModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
