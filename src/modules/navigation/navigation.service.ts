import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import {
  KakaoPlaceSearchResult,
  KakaoDirectionsResult,
  KakaoAddressSearchResult,
} from './interfaces/kakao.interface';

@Injectable()
export class NavigationService {
  private readonly kakaoApiKey: string;
  private readonly kakaoMobilityApiKey: string;

  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {
    const apiKey = this.configService.get<string>('KAKAO_REST_API_KEY');
    const mobilityApiKey = this.configService.get<string>(
      'KAKAO_MOBILITY_API_KEY',
    );

    if (!apiKey || !mobilityApiKey) {
      throw new InternalServerErrorException(
        'Kakao API keys are not configured',
      );
    }

    this.kakaoApiKey = apiKey;
    this.kakaoMobilityApiKey = mobilityApiKey;
  }

  async searchPlaces(query: string): Promise<KakaoPlaceSearchResult> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<KakaoPlaceSearchResult>(
          'https://dapi.kakao.com/v2/local/search/keyword.json',
          {
            params: { query },
            headers: {
              Authorization: `KakaoAK ${this.kakaoApiKey}`,
            },
          },
        ),
      );
      if (!data || !Array.isArray(data.documents) || !data.meta) {
        throw new Error('Invalid response format from Kakao Places API');
      }
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new InternalServerErrorException(
          `Failed to search places: ${error.message}`,
        );
      }
      // axios error handling
      if (typeof error === 'object' && error && 'response' in error) {
        const axiosError = error as {
          response?: {
            status?: number;
            data?: any;
          };
        };
        throw new InternalServerErrorException(
          `Kakao API error: ${axiosError.response?.status} - ${JSON.stringify(axiosError.response?.data)}`,
        );
      }
      throw new InternalServerErrorException(
        'An unexpected error occurred while searching places',
      );
    }
  }

  async getDirections(
    origin: string,
    destination: string,
    mode: 'TRANSIT' | 'CAR' | 'WALK',
  ): Promise<KakaoDirectionsResult> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<KakaoDirectionsResult>(
          'https://apis-navi.kakaomobility.com/v1/directions',
          {
            params: {
              origin,
              destination,
              priority: 'RECOMMEND',
              car_fuel: mode === 'CAR' ? 'GASOLINE' : undefined,
              car_hipass: mode === 'CAR' ? false : undefined,
              alternatives: true,
              road_details: true,
            },
            headers: {
              Authorization: `KakaoAK ${this.kakaoMobilityApiKey}`,
              'Content-Type': 'application/json',
            },
          },
        ),
      );
      if (!data || !data.routes || !Array.isArray(data.routes)) {
        throw new Error('Invalid response format from Kakao Directions API');
      }
      return data;
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : typeof error === 'object' && error && 'message' in error
            ? String((error as { message: unknown }).message)
            : 'Unknown error';
      throw new InternalServerErrorException(
        'Failed to get directions: ' + message,
      );
    }
  }

  async searchAddress(query: string): Promise<KakaoAddressSearchResult> {
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<KakaoAddressSearchResult>(
          'https://dapi.kakao.com/v2/local/search/address.json',
          {
            params: { query },
            headers: {
              Authorization: `KakaoAK ${this.kakaoApiKey}`,
            },
          },
        ),
      );
      if (
        !data ||
        !Array.isArray(data.documents) ||
        typeof data.meta !== 'object'
      ) {
        throw new Error('Invalid response format from Kakao Address API');
      }
      return data;
    } catch (error: unknown) {
      const message =
        error instanceof Error
          ? error.message
          : typeof error === 'object' && error && 'message' in error
            ? String((error as { message: unknown }).message)
            : 'Unknown error';
      throw new InternalServerErrorException(
        'Failed to search address: ' + message,
      );
    }
  }
}
