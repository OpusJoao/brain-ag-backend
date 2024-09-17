import { Module } from '@nestjs/common';
import RuralProducerController from './rural-producer/presentation/controllers/rural-producer.controller';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [RuralProducerController],
  providers: [],
})
export class AppModule {}
