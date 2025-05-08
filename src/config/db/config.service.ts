import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class DbConfigService {
  constructor(private configService: ConfigService) {}

  get dbHost() {
    return this.configService.get<string>('DB_HOST'); 
  }

  get dbPort() {
    return this.configService.get<number>('DB_PORT');
  }

  get dbUser() {
    return this.configService.get<string>('DB_USERNAME');
  }

  get dbPassword() {
    return this.configService.get<string>('DB_PASSWORD');
  }

  get dbName() {
    return this.configService.get<string>('DB_NAME');
  }
}
