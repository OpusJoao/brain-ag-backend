import { Repository } from 'typeorm';
import RuralProducerEntity from '../entities/rural-producer.entity';
import { Inject } from '@nestjs/common';
import { GetRuralProducerResponseRepositoryInterface } from '../interfaces/get-rural-producer-response-repository.interface';
import BodyCreateRuralProducerDto from '../../presentation/dtos/body-create-rural-producer.dto';
import { CreateRuralProducerResponseRepositoryInterface } from '../interfaces/create-rural-producer-response-repository.interface';
import BodyUpdateRuralProducerDto from '../../presentation/dtos/body-update-rural-producer.dto';

export const RURAL_PRODUCER_REPOSITORY = 'RURAL_PRODUCER_REPOSITORY';
export default class RuralProducerRepository {
  constructor(
    @Inject(RURAL_PRODUCER_REPOSITORY)
    private readonly repository: Repository<RuralProducerEntity>,
  ) {}
  getRuralProducer(
    id?: number,
  ): Promise<GetRuralProducerResponseRepositoryInterface[]> {
    if (id == null) {
      this.repository.find();
    }
    return this.repository.findBy({
      id: id,
    });
  }

  async createRuralProducer(
    ruralProducer: BodyCreateRuralProducerDto,
  ): Promise<CreateRuralProducerResponseRepositoryInterface> {
    const ruralProducerToBecreated = new RuralProducerEntity();

    ruralProducerToBecreated.agriculturalArea = ruralProducer.agriculturalArea;
    ruralProducerToBecreated.city = ruralProducer.city;
    ruralProducerToBecreated.document = ruralProducer.document;
    ruralProducerToBecreated.farmName = ruralProducer.farmName;
    ruralProducerToBecreated.name = ruralProducer.name;
    ruralProducerToBecreated.state = ruralProducer.state;
    ruralProducerToBecreated.vegetationArea = ruralProducer.vegetationArea;
    ruralProducerToBecreated.totalArea = ruralProducer.totalArea;
    ruralProducerToBecreated.createdAt = new Date();
    ruralProducerToBecreated.updatedAt = new Date();

    return await this.repository.save(ruralProducerToBecreated);
  }

  async deleteRuralProducer(id: number) {
    return await this.repository.softDelete({
      id,
    });
  }

  async updateRuralProducer(
    id: number,
    ruralProducer: BodyUpdateRuralProducerDto,
  ) {
    return await this.repository.update({ id }, ruralProducer);
  }
}
