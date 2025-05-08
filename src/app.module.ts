import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppConfigService } from './config/app/config.service';
import { AppDataSource } from './ormconfig';
import { UserModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { UmbrellasModule } from './modules/umbrellas/umbrellas.module';
import { StationsModule } from './modules/stations/stations.module';
import { RentalsModule } from './modules/rentals/rentals.module';
import { PaymentsModule } from './modules/payments/payments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(AppDataSource.options),
    UserModule,
    AuthModule,
    UmbrellasModule,
    StationsModule,
    RentalsModule,
    PaymentsModule,],
  controllers: [AppController],
  providers: [AppService, AppConfigService],
})
export class AppModule {}
