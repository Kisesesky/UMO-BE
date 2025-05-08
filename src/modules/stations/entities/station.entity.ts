import { Umbrella } from "src/modules/umbrellas/entities/umbrella.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Station {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ type: 'geometry', spatialFeatureType: 'Point', srid: 4326 })
  location: string;

  @OneToMany(() => Umbrella, umbrella => umbrella.station)
  umbrellas: Umbrella[];
}
