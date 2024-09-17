import { Repository } from 'typeorm';
import RuralProducerEntity from '../entities/rural-producer.entity';
import { Inject } from '@nestjs/common';

const RURAL_PRODUCER_REPOSITORY = 'RURAL_PRODUCER_REPOSITORY';
export default class RuralProducerRepository {
  constructor(
    @Inject(RURAL_PRODUCER_REPOSITORY)
    private readonly repository: Repository<RuralProducerEntity>,
  ) {}
}
