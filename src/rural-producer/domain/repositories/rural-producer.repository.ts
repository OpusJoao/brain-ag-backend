import { Repository } from 'typeorm';
import RuralProducerEntity from '../entities/rural-producer.entity';
import { Inject } from '@nestjs/common';
import { GetRuralProducerResponseRepositoryInterface } from '../interfaces/get-rural-producer-response-repository.interface';
import { CreateRuralProducerResponseRepositoryInterface } from '../interfaces/create-rural-producer-response-repository.interface';
import UpdateRuralProducerInterface from '../interfaces/update-rural-producer.interface';
import CreateRuralProducerInterface from '../interfaces/create-rural-producer.interface';

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
      return this.repository.find({
        relations: {
          plantedCrops: true,
        },
      });
    }
    return this.repository.findBy({
      id: id,
    });
  }

  getRuralProducerByDocument(
    document?: string,
  ): Promise<GetRuralProducerResponseRepositoryInterface> {
    return this.repository.findOneBy({
      document,
    });
  }

  async createRuralProducer(
    ruralProducer: CreateRuralProducerInterface,
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
    ruralProducerToBecreated.plantedCrops = ruralProducer.plantedCrops;

    return await this.repository.save(ruralProducerToBecreated);
  }

  async deleteRuralProducer(id: number) {
    return await this.repository.softDelete({
      id,
    });
  }

  async updateRuralProducer(
    id: number,
    ruralProducer: UpdateRuralProducerInterface,
  ) {
    return await this.repository.update({ id }, ruralProducer);
  }

  async getViewDashboard() {
    const query = `
      SELECT 
        count(rp.id) as total_of_farm_in_quantity, 
        sum(rp.total_area) as total_of_farm_in_hectares 
      FROM rural_producers AS rp
      WHERE rp.deleted_at IS NULL
    `;

    const result = await this.repository.query(query);
    console.log(result);
    return {
      totalOfFarmInQuantity: result[0].total_of_farm_in_quantity,
      totalOfFarmInHectares: result[0].total_of_farm_in_hectares,
    };
  }
}
