import { Injectable } from '@nestjs/common';
import PlantedCropRepository from '../../domain/repositories/planted-crop.repository';
import PlantedCropEntity from '../../domain/entities/planted-crop.entity';

@Injectable()
export default class PlantedCropService {
  constructor(private readonly plantedCropRepository: PlantedCropRepository) {}

  async getByIds(ids: number[]): Promise<PlantedCropEntity[]> {
    return await this.plantedCropRepository.getByIds(ids);
  }
}
