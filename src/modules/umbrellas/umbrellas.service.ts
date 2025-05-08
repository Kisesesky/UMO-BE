import { Injectable } from '@nestjs/common';
import { CreateUmbrellaDto } from './dto/create-umbrella.dto';
import { UpdateUmbrellaDto } from './dto/update-umbrella.dto';

@Injectable()
export class UmbrellasService {
  create(createUmbrellaDto: CreateUmbrellaDto) {
    return 'This action adds a new umbrella';
  }

  findAll() {
    return `This action returns all umbrellas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} umbrella`;
  }

  update(id: number, updateUmbrellaDto: UpdateUmbrellaDto) {
    return `This action updates a #${id} umbrella`;
  }

  remove(id: number) {
    return `This action removes a #${id} umbrella`;
  }
}
