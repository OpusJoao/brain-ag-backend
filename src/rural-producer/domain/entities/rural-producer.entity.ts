import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'rural_producers' })
export default class RuralProducerEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  document: string;

  @Column()
  name: string;

  @Column()
  farmName: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  totalArea: number;

  @Column()
  agriculturalArea: number;

  @Column()
  vegetationArea: number;

  @DeleteDateColumn({ name: 'deleted_at' })
  public deletedAt?: Date;

  @CreateDateColumn({ type: 'timestamp', name: 'created_at' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp', name: 'updated_at' })
  public updatedAt!: Date;
}
