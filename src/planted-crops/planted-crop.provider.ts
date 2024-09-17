import { DataSource } from 'typeorm';
import { DATA_SOURCE } from '../database/database.provider';
import PlantedCropRepository, {
  PLANTED_CROP_REPOSITORY,
} from './domain/repositories/planted-crop.repository';
import PlantedCropEntity from './domain/entities/planted-crop.entity';
import PlantedCropService from './application/services/planted-crop.service';

export const plantedCropsProviders = [
  PlantedCropService,
  {
    provide: PLANTED_CROP_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(PlantedCropEntity),
    inject: [DATA_SOURCE],
  },
  PlantedCropRepository,
];
