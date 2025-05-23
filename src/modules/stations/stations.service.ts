import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Station } from './entities/station.entity';
import { calculateDistance } from '../../utils/distance';

@Injectable()
export class StationsService {
  constructor(
    @InjectRepository(Station)
    private stationRepo: Repository<Station>,
  ) {}

  create(data: Partial<Station>) {
    const station = this.stationRepo.create(data);
    return this.stationRepo.save(station);
  }

  findAll() {
    return this.stationRepo.find({ relations: ['umbrellas'] });
  }

  findOne(id: number) {
    return this.stationRepo.findOne({
      where: { id },
      relations: ['umbrellas'],
    });
  }

  remove(id: number) {
    return this.stationRepo.delete(id);
  }
  
  async getStationsForMap() {
    const stations = await this.stationRepo.find({ relations: ['umbrellas'] });
  
    return stations.map(station => {
      const total = station.umbrellas.length;
      const available = station.umbrellas.filter(u => u.status === 'idle').length;
  
      return {
        id: station.id,
        name: station.name,
        latitude: station.latitude,
        longitude: station.longitude,
        availableUmbrellas: available,
        totalUmbrellas: total,
      };
    });
  }

  async findNearby(lat: number, lng: number): Promise<any[]> {
    const radiusInKm = 1; // 반경 1km
    const stations = await this.stationRepo
      .createQueryBuilder('station')
      .addSelect(`
        (6371 * acos(
          cos(radians(:lat)) *
          cos(radians(station.latitude)) *
          cos(radians(station.longitude) - radians(:lng)) +
          sin(radians(:lat)) *
          sin(radians(station.latitude))
        ))`, 'distance')
      .having('distance < :radius', { radius: radiusInKm })
      .setParameters({ lat, lng })
      .getMany();

    return Promise.all(
      stations.map(async (station) => {
        const availableUmbrellas = await this.stationRepo.manager.count('umbrella', {
          where: { station: station.id, isAvailable: true },
        });

        return {
          id: station.id,
          name: station.name,
          latitude: station.latitude,
          longitude: station.longitude,
          availableUmbrellas,
        };
      }),
    );
  }
}
