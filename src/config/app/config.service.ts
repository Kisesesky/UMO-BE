import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppConfigService {
  jwtService: string | Buffer | undefined;
  constructor(private configService: ConfigService) {}

  get port() {
    return this.configService.get<number>('app.port');
  }

  get dev() {
    return this.configService.get<string>('app.nodeEnv');
  }
}
