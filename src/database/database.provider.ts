import { DataSource } from 'typeorm';
import RuralProducerEntity from '../rural-producer/domain/entities/rural-producer.entity';
import PlantedCropsEntity from '../rural-producer/domain/entities/planted-crops.entity';

export const DATA_SOURCE = 'DATA_SOURCE';
export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'root',
        password: 'root',
        database: 'test',
        entities: [RuralProducerEntity, PlantedCropsEntity],
        synchronize: true,
      });

      return dataSource.initialize();
    },
  },
];
