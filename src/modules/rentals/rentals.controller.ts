import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { RentalsService } from './rentals.service';

@Controller('rentals')
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  @Post('rent')
  rent(@Body() body: { userId: number; umbrellaId: number; lat: number; lng: number }) {
    return this.rentalsService.rent(body.userId, body.umbrellaId, body.lat, body.lng);
  }

  @Post(':id/return')
  return(@Param('id') id: string, @Body() body: { lat: number; lng: number }) {
    return this.rentalsService.returnUmbrella(+id, body.lat, body.lng);
  }

  @Get()
  findAll() {
    return this.rentalsService.findAll();
  }
}
