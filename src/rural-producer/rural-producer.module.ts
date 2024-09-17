import { Module } from '@nestjs/common';
import RuralProducerController from './presentation/controllers/rural-producer.controller';
import { ruralProducerProviders } from './rural-producer.providers';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [RuralProducerController],
  providers: [...ruralProducerProviders],
  exports: [...ruralProducerProviders],
})
export default class RuralProducerModule {}
