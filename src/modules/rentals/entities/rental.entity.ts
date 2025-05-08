import { Umbrella } from "src/modules/umbrellas/entities/umbrella.entity";
import { User } from "src/modules/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Rental {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.rentals)
  user: User;

  @ManyToOne(() => Umbrella, umbrella => umbrella.rentals)
  umbrella: Umbrella;

  @Column()
  startTime: Date;

  @Column({ nullable: true })
  endTime: Date;

  @Column({ default: false })
  isPaid: boolean;
}
