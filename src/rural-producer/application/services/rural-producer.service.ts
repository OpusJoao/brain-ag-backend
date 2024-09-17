import { Injectable } from '@nestjs/common';
import RuralProducerRepository from '../../domain/repositories/rural-producer.repository';
import BodyCreateRuralProducerDto from '../../presentation/dtos/body-create-rural-producer.dto';
import BodyUpdateRuralProducerDto from '../../presentation/dtos/body-update-rural-producer.dto';
import RuralProducerAlreadyExistsException from '../../presentation/exceptions/rural-producer-already-exists.exception';
import InvalidTotalAreaException from '../../presentation/exceptions/invalid-total-area.exception';

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
    if (this.isNotValidTotalArea(ruralProducer))
      throw new InvalidTotalAreaException();
    const ruralProducerFound =
      await this.ruralProducerRepository.getRuralProducerByDocument(
        ruralProducer.document,
      );
    if (ruralProducerFound?.id) {
      throw new RuralProducerAlreadyExistsException();
    }
    const ruralProducerCreated =
      await this.ruralProducerRepository.createRuralProducer(ruralProducer);

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

  async update(id: number, ruralProducer: BodyUpdateRuralProducerDto) {
    const ruralProducerFound = await this.get(id);

    if (
      this.isNotValidTotalArea({
        ...ruralProducerFound[0],
        agriculturalArea:
          ruralProducer.agriculturalArea ||
          ruralProducerFound[0].agriculturalArea,
        totalArea: ruralProducer.totalArea || ruralProducerFound[0].totalArea,
        vegetationArea:
          ruralProducer.vegetationArea || ruralProducerFound[0].vegetationArea,
      })
    )
      throw new Error('Area maior');

    if (ruralProducerFound.length < 1) throw new Error('');
    return (
      (
        await this.ruralProducerRepository.updateRuralProducer(
          id,
          ruralProducer,
        )
      ).affected > 0
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
