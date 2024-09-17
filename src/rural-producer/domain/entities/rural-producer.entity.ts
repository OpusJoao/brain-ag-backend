import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
