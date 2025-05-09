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

  async findNearby(lat: number, lng: number, maxDistance = 3): Promise<any[]> {
    const stations = await this.stationRepo.find({ relations: ['umbrellas'] });
  
    return stations
      .map(station => {
        const distance = calculateDistance(lat, lng, station.latitude, station.longitude);
        const availableCount = station.umbrellas.filter(u => u.status === 'idle').length;
  
        return {
          id: station.id,
          name: station.name,
          latitude: station.latitude,
          longitude: station.longitude,
          distance,
          availableUmbrellas: availableCount,
        };
      })
      .filter(station => station.distance <= maxDistance)
      .sort((a, b) => a.distance - b.distance);
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
  
}
