import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Umbrella } from './entities/umbrella.entity';

@Injectable()
export class UmbrellasService {
  constructor(
    @InjectRepository(Umbrella)
    private umbrellaRepository: Repository<Umbrella>,
  ) {}

  create(data: Partial<Umbrella>) {
    const umbrella = this.umbrellaRepository.create(data);
    return this.umbrellaRepository.save(umbrella);
  }

  findAll() {
    return this.umbrellaRepository.find();
  }

  findOne(id: number) {
    return this.umbrellaRepository.findOneBy({ id });
  }

  updateStatus(id: number, status: Umbrella['status']) {
    return this.umbrellaRepository.update(id, { status });
  }

  remove(id: number) {
    return this.umbrellaRepository.delete(id);
  }
}
