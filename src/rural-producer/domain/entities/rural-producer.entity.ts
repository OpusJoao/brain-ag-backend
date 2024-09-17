import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import PlantedCropsEntity from '../../../planted-crops/domain/entities/planted-crop.entity';

@Entity({ name: 'rural_producers' })
export default class RuralProducerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  document: string;

  @Column()
  name: string;

  @Column({
    name: 'farm_name',
  })
  farmName: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column({
    name: 'total_area',
  })
  totalArea: number;

  @Column({
    name: 'agricultural_area',
  })
  agriculturalArea: number;

  @Column({
    name: 'vegetation_area',
  })
  vegetationArea: number;

  @ManyToMany(() => PlantedCropsEntity)
  @JoinTable()
  plantedCrops: PlantedCropsEntity[];

  @DeleteDateColumn({ name: 'deleted_at' })
  public deletedAt?: Date;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  public updatedAt!: Date;
}
