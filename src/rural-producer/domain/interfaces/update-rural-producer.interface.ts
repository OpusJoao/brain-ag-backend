import PlantedCropEntity from '../../../planted-crops/domain/entities/planted-crop.entity';

export default interface UpdateRuralProducerInterface {
  document?: string;
  name?: string;
  farmName?: string;
  city?: string;
  state?: string;
  totalArea?: number;
  agriculturalArea?: number;
  vegetationArea?: number;
  plantedCrops?: PlantedCropEntity[];
}
