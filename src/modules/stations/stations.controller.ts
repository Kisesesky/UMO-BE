// src/stations/stations.controller.ts
import { Controller, Get, Post, Query } from '@nestjs/common';
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

  @Post('init')
  async initializeStations() {
    return this.stationsService.initializeStations();
  }

  @Get('map')
  async getStationsForMap() {
    return this.stationsService.getStationsForMap();
  }
}
