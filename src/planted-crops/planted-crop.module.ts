import { Module } from '@nestjs/common';
import { plantedCropsProviders } from './planted-crop.provider';

@Module({
  providers: [...plantedCropsProviders],
  exports: [...plantedCropsProviders],
})
export default class PlantedCropsModule {}
