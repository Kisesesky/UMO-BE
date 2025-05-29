import { Umbrella } from 'src/modules/umbrellas/entities/umbrella.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Station {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  latitude: number;

  @Column()
  longitude: number;

  @OneToMany(() => Umbrella, (umbrella) => umbrella.station)
  umbrellas: Umbrella[];
}
