import { Controller, Post, Get, Param, Delete, Body, Query } from '@nestjs/common';
import { StationsService } from './stations.service';

@Controller('stations')
export class StationsController {
  constructor(private readonly stationsService: StationsService) {}

  @Post()
  create(@Body() body: { name: string; latitude: number; longitude: number }) {
    return this.stationsService.create(body);
  }

  @Get()
  findAll() {
    return this.stationsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stationsService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.stationsService.remove(+id);
  }

  @Get('nearby')
  findNearby(@Query('lat') lat: string, @Query('lng') lng: string, @Query('range') range = '3') {
    return this.stationsService.findNearby(+lat, +lng, +range);
  }

  @Get('map')
  getStationsForMap() {
    return this.stationsService.getStationsForMap();
  }

}
