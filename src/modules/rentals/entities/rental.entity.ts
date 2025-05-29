import { Umbrella } from 'src/modules/umbrellas/entities/umbrella.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';

@Entity()
export class Rental {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, { eager: true })
  user: User;

  @ManyToOne(() => Umbrella, { eager: true })
  umbrella: Umbrella;

  @CreateDateColumn()
  rentedAt: Date;

  @Column({ nullable: true })
  returnedAt: Date;

  @Column({ type: 'float', nullable: true })
  rentLatitude: number;

  @Column({ type: 'float', nullable: true })
  rentLongitude: number;

  @Column({ type: 'float', nullable: true })
  returnLatitude: number;

  @Column({ type: 'float', nullable: true })
  returnLongitude: number;
}
