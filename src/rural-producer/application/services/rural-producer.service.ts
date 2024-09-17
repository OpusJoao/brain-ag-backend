import { Injectable } from '@nestjs/common';
import RuralProducerRepository from '../../domain/repositories/rural-producer.repository';
import BodyCreateRuralProducerDto from '../../presentation/dtos/body-create-rural-producer.dto';

@Injectable()
export default class RuralProducerService {
  constructor(
    private readonly ruralProducerRepository: RuralProducerRepository,
  ) {}
  async get(id: number) {
    const ruralProducers =
      await this.ruralProducerRepository.getRuralProducer(id);

    return ruralProducers;
  }

  async create(ruralProducer: BodyCreateRuralProducerDto) {
    const ruralProducerCreated =
      await this.ruralProducerRepository.createRuralProducer(ruralProducer);

    return ruralProducerCreated;
  }

  async delete(id: number) {
    let wasDeleted = false;
    const ruralProducer = await this.get(id);
    console.log(ruralProducer);
    if (ruralProducer.length < 1) return wasDeleted;
    wasDeleted =
      (await this.ruralProducerRepository.deleteRuralProducer(id)).affected > 0;
    return wasDeleted;
  }
}
