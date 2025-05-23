import { Controller, Get, Query } from '@nestjs/common';
import { NavigationService } from './navigation.service';
import {
  KakaoPlaceSearchResult,
  KakaoAddressSearchResult,
  KakaoDirectionsResult,
} from './interfaces/kakao.interface';

@Controller('navigation')
export class NavigationController {
  constructor(private readonly navigationService: NavigationService) {}

  @Get('search')
  async searchPlaces(
    @Query('query') query: string,
  ): Promise<KakaoPlaceSearchResult> {
    return this.navigationService.searchPlaces(query);
  }

  @Get('directions')
  async getDirections(
    @Query('origin') origin: string,
    @Query('destination') destination: string,
    @Query('mode') mode: 'TRANSIT' | 'CAR' | 'WALK',
  ): Promise<KakaoDirectionsResult> {
    return this.navigationService.getDirections(origin, destination, mode);
  }

  @Get('address')
  async searchAddress(
    @Query('query') query: string,
  ): Promise<KakaoAddressSearchResult> {
    return this.navigationService.searchAddress(query);
  }
}
