import { Repository } from 'typeorm';
import RuralProducerEntity from '../entities/rural-producer.entity';
import { Inject } from '@nestjs/common';
import GetRuralProducerRepositoryInterface, {
  GetRuralProducerResponseRepositoryInterface,
} from '../interfaces/get-rural-producer-repository.interface';

export const RURAL_PRODUCER_REPOSITORY = 'RURAL_PRODUCER_REPOSITORY';
export default class RuralProducerRepository
  implements GetRuralProducerRepositoryInterface
{
  constructor(
    @Inject(RURAL_PRODUCER_REPOSITORY)
    private readonly repository: Repository<RuralProducerEntity>,
  ) {}
  getRuralProducer(
    id?: number,
  ): Promise<GetRuralProducerResponseRepositoryInterface[]> {
    return this.repository.findBy({
      id: id,
    });
  }
}
