import { Module } from '@nestjs/common';
import RuralProducerController from './presentation/controllers/rural-producer.controller';
import { ruralProducerProviders } from './rural-producer.providers';
import { DatabaseModule } from '../database/database.module';
import UtilsModule from '../utils/utils.module';
import PlantedCropsModule from '../planted-crops/planted-crop.module';

@Module({
  imports: [DatabaseModule, UtilsModule, PlantedCropsModule],
  controllers: [RuralProducerController],
  providers: [...ruralProducerProviders],
  exports: [...ruralProducerProviders],
})
export default class RuralProducerModule {}
