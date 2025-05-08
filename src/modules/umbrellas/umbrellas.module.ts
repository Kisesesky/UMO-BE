import { Module } from '@nestjs/common';
import { UmbrellasService } from './umbrellas.service';
import { UmbrellasController } from './umbrellas.controller';

@Module({
  controllers: [UmbrellasController],
  providers: [UmbrellasService],
})
export class UmbrellasModule {}
