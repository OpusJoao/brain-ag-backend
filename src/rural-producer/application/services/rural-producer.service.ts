import { Injectable } from '@nestjs/common';
import RuralProducerRepository from '../../domain/repositories/rural-producer.repository';

@Injectable()
export default class RuralProducerService {
  constructor(
    private readonly ruralProducerRepository: RuralProducerRepository,
  ) {}
  getRuralProducer(id: number) {
    return this.ruralProducerRepository.getRuralProducer(id);
  }
}
