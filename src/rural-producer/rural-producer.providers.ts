import { DataSource } from 'typeorm';
import RuralProducerService from './application/services/rural-producer.service';
import RuralProducerEntity from './domain/entities/rural-producer.entity';
import RuralProducerRepository, {
  RURAL_PRODUCER_REPOSITORY,
} from './domain/repositories/rural-producer.repository';
import { DATA_SOURCE } from '../database/database.provider';

export const ruralProducerProviders = [
  RuralProducerService,
  {
    provide: RURAL_PRODUCER_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(RuralProducerEntity),
    inject: [DATA_SOURCE],
  },
  RuralProducerRepository,
];
