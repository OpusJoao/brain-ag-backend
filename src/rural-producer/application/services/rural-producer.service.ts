import { Injectable } from '@nestjs/common';
import RuralProducerRepository from '../../domain/repositories/rural-producer.repository';
import BodyCreateRuralProducerDto from '../../presentation/dtos/body-create-rural-producer.dto';
import BodyUpdateRuralProducerDto from '../../presentation/dtos/body-update-rural-producer.dto';
import RuralProducerAlreadyExistsException from '../../presentation/exceptions/rural-producer-already-exists.exception';
import InvalidTotalAreaException from '../../presentation/exceptions/invalid-total-area.exception';
import PlantedCropEntity from '../../../planted-crops/domain/entities/planted-crop.entity';
import CreateRuralProducerInterface from '../../domain/interfaces/create-rural-producer.interface';
import PlantedCropService from '../../../planted-crops/application/services/planted-crop.service';
import { PlantedCropsEnum } from '../../domain/enums/planted-crops.enum';
import RuralProducerNotExistsException from '../../presentation/exceptions/rural-producer-not-exists.exception';

@Injectable()
export default class RuralProducerService {
  constructor(
    private readonly ruralProducerRepository: RuralProducerRepository,
    private readonly plantedCropsService: PlantedCropService,
  ) {}
  async get(id?: number) {
    const ruralProducers =
      await this.ruralProducerRepository.getRuralProducer(id);

    return ruralProducers;
  }

  async create(ruralProducer: BodyCreateRuralProducerDto) {
    if (this.isNotValidTotalArea(ruralProducer))
      throw new InvalidTotalAreaException();
    const ruralProducerFound =
      await this.ruralProducerRepository.getRuralProducerByDocument(
        ruralProducer.document,
      );
    if (ruralProducerFound?.id) {
      throw new RuralProducerAlreadyExistsException();
    }

    const plantedCropsToSave: PlantedCropsEnum[] = [];
    for (const plantedCrop of ruralProducer.plantedCrops) {
      plantedCropsToSave.push(PlantedCropsEnum[plantedCrop]);
    }

    const plantedCrops: PlantedCropEntity[] =
      await this.plantedCropsService.getByIds(plantedCropsToSave);

    const ruralProducerToCreate: CreateRuralProducerInterface = {
      ...ruralProducer,
      plantedCrops: plantedCrops,
    };

    const ruralProducerCreated =
      await this.ruralProducerRepository.createRuralProducer(
        ruralProducerToCreate,
      );

    return ruralProducerCreated;
  }

  async delete(id: number) {
    let wasDeleted = false;
    const ruralProducer = await this.get(id);
    if (ruralProducer.length < 1) return wasDeleted;
    wasDeleted =
      (await this.ruralProducerRepository.deleteRuralProducer(id)).affected > 0;
    return wasDeleted;
  }

  async update(
    id: number,
    ruralProducer: BodyUpdateRuralProducerDto,
  ): Promise<boolean> {
    const ruralProducerFound = await this.get(id);
    if (ruralProducerFound.length < 1)
      throw new RuralProducerNotExistsException();

    if (
      this.isNotValidTotalArea({
        ...ruralProducerFound[0],
        agriculturalArea:
          ruralProducer?.agriculturalArea ||
          ruralProducerFound[0].agriculturalArea,
        totalArea: ruralProducer?.totalArea || ruralProducerFound[0].totalArea,
        vegetationArea:
          ruralProducer?.vegetationArea || ruralProducerFound[0].vegetationArea,
      })
    )
      throw new InvalidTotalAreaException();

    let plantedCrops: PlantedCropEntity[] = [];
    if (ruralProducer?.plantedCrops?.length > 0) {
      const plantedCropsToSave: PlantedCropsEnum[] = [];
      for (const plantedCrop of ruralProducer.plantedCrops) {
        plantedCropsToSave.push(PlantedCropsEnum[plantedCrop]);
      }

      plantedCrops =
        await this.plantedCropsService.getByIds(plantedCropsToSave);
    }

    return (
      (
        await this.ruralProducerRepository.updateRuralProducer(id, {
          ...ruralProducer,
          plantedCrops: plantedCrops?.length > 0 ? plantedCrops : undefined,
        })
      )?.id > 0
    );
  }

  private isNotValidTotalArea(
    ruralProducer: Partial<BodyCreateRuralProducerDto>,
  ) {
    return (
      ruralProducer.agriculturalArea + ruralProducer.vegetationArea >
      ruralProducer.totalArea
    );
  }
}
