import { Rental } from "src/modules/rentals/entities/rental.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  name: string;

  @Column({ default: 'local' })
  provider: 'google' | 'kakao' | 'naver' | 'local';

  @Column({ nullable: true })
  password: string;

  @OneToMany(() => Rental, rental => rental.user)
  rentals: Rental[];
}
