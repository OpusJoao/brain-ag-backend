import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import RuralProducerModule from './rural-producer/rural-producer.module';

@Module({
  imports: [DatabaseModule, RuralProducerModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
