import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import PlantedCropEntity from '../entities/planted-crop.entity';

export const PLANTED_CROP_REPOSITORY = 'PLANTED_CROP_REPOSITORY';
export default class PlantedCropRepository {
  constructor(
    @Inject(PLANTED_CROP_REPOSITORY)
    private readonly repository: Repository<PlantedCropEntity>,
  ) {}
}
