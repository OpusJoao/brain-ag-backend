import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import RuralProducerEntity from '../../../rural-producer/domain/entities/rural-producer.entity';

@Entity({ name: 'planted_crops' })
export default class PlantedCropEntity {
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
