// src/stations/stations.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { StationsService } from './stations.service';

@Controller('stations')
export class StationsController {
  constructor(private readonly stationsService: StationsService) {}

  @Get('nearby')
  async findNearbyStations(
    @Query('lat') lat: string,
    @Query('lng') lng: string,
  ) {
    return this.stationsService.findNearby(+lat, +lng);
  }
}
