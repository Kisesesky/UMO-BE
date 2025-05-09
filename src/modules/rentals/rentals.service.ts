import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Umbrella } from '../umbrellas/entities/umbrella.entity';
import { User } from '../users/entities/user.entity';
import { Rental } from './entities/rental.entity';

@Injectable()
export class RentalsService {
  constructor(
    @InjectRepository(Rental) private rentalRepo: Repository<Rental>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Umbrella) private umbrellaRepo: Repository<Umbrella>,
  ) {}

  async rent(userId: number, umbrellaId: number, lat: number, lng: number) {
    const user = await this.userRepo.findOneBy({ id: userId });
    const umbrella = await this.umbrellaRepo.findOneBy({ id: umbrellaId });
  
    if (!user || !umbrella) throw new NotFoundException('User or Umbrella not found');
    if (umbrella.status !== 'idle') throw new BadRequestException('Umbrella is not available');
  
    umbrella.status = 'in_use';
    await this.umbrellaRepo.save(umbrella);
  
    const rental = this.rentalRepo.create({
      user,
      umbrella,
      rentLatitude: lat,
      rentLongitude: lng,
    });
    return this.rentalRepo.save(rental);
  }
  
  async returnUmbrella(rentalId: number, lat: number, lng: number) {
    const rental = await this.rentalRepo.findOneBy({ id: rentalId });
    if (!rental || rental.returnedAt) throw new BadRequestException('Invalid rental');
  
    rental.returnedAt = new Date();
    rental.returnLatitude = lat;
    rental.returnLongitude = lng;
  
    rental.umbrella.status = 'idle';
    await this.umbrellaRepo.save(rental.umbrella);
    return this.rentalRepo.save(rental);
  }

  async findAll() {
    return this.rentalRepo.find();
  }
}
