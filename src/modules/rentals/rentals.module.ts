import { Module } from '@nestjs/common';
import { RentalsService } from './rentals.service';
import { RentalsController } from './rentals.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rental } from './entities/rental.entity';
import { User } from '../users/entities/user.entity';
import { Umbrella } from '../umbrellas/entities/umbrella.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rental, User, Umbrella])],
  controllers: [RentalsController],
  providers: [RentalsService],
})
export class RentalsModule {}
