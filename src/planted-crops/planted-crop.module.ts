import { Module } from '@nestjs/common';
import { plantedCropsProviders } from './planted-crop.provider';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [...plantedCropsProviders],
  exports: [...plantedCropsProviders],
})
export default class PlantedCropsModule {}
