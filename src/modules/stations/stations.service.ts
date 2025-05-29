import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Station } from './entities/station.entity';

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

    return stations.map((station) => {
      const total = station.umbrellas.length;
      const available = station.umbrellas.filter(
        (u) => u.status === 'idle',
      ).length;

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

  async initializeStations() {
    // 주요 지하철역 데이터
    const stationData = [
      { name: '서울역', latitude: 37.5544, longitude: 126.9706 },
      { name: '용산역', latitude: 37.5311, longitude: 126.9647 },
      { name: '강남역', latitude: 37.4982, longitude: 127.0276 },
      { name: '역삼역', latitude: 37.5042, longitude: 127.0497 },
      { name: '신촌역', latitude: 37.5552, longitude: 126.9366 },
      { name: '홍대입구역', latitude: 37.5582, longitude: 126.9249 },
      { name: '이태원역', latitude: 37.5142, longitude: 127.0216 },
      { name: '삼성중앙역', latitude: 37.5148, longitude: 127.0532 },
      { name: '여의도역', latitude: 37.5214, longitude: 126.9367 },
      { name: '강남구청역', latitude: 37.4882, longitude: 127.0406 },
    ];

    // 기존 데이터 확인
    const existingStations = await this.stationRepo.find();
    if (existingStations.length === 0) {
      // 신규 데이터 추가
      for (const data of stationData) {
        await this.create(data);
      }
      return '지하철역 데이터 초기화 완료';
    }
    return '이미 데이터가 존재합니다';
  }

  async findNearby(lat: number, lng: number): Promise<any[]> {
    const radiusInKm = 1; // 반경 1km
    const stations = await this.stationRepo
      .createQueryBuilder('station')
      .addSelect(
        `(6371 * acos(
          cos(radians(:lat)) *
          cos(radians(station.latitude)) *
          cos(radians(station.longitude) - radians(:lng)) +
          sin(radians(:lat)) *
          sin(radians(station.latitude))
        ))`,
        'distance',
      )
      .having('distance < :radius', { radius: radiusInKm })
      .setParameters({ lat, lng })
      .getMany();

    return Promise.all(
      stations.map(async (station) => {
        const availableUmbrellas = await this.stationRepo.manager.count(
          'umbrella',
          {
            where: { station: station.id, isAvailable: true },
          },
        );

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
