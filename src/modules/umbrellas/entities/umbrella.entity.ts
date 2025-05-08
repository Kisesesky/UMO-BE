import { Rental } from "src/modules/rentals/entities/rental.entity";
import { Station } from "src/modules/stations/entities/station.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Umbrella {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  qrCode: string;

  @Column({ default: 'idle' })
  status: 'idle' | 'in_use' | 'lost' | 'damaged';

  @ManyToOne(() => Station, station => station.umbrellas)
  station: Station;

  @OneToMany(() => Rental, rental => rental.umbrella)
  rentals: Rental[];
}
