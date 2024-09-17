import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import RuralProducerEntity from './rural-producer.entity';

@Entity({ name: 'planted_crops' })
export default class PlantedCropsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToMany(
    () => RuralProducerEntity,
    (ruralProducer) => ruralProducer.plantedCrops,
  )
  ruralProducer: RuralProducerEntity;

  @DeleteDateColumn({ name: 'deleted_at' })
  public deletedAt?: Date;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  public updatedAt!: Date;
}
