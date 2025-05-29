import { Controller, Get, Post, Param, Delete, Body, Patch } from '@nestjs/common';
import { UmbrellasService } from './umbrellas.service';

@Controller('umbrellas')
export class UmbrellasController {
  constructor(private readonly umbrellasService: UmbrellasService) {}

  @Post()
  create(@Body() body: { qrCode: string }) {
    return this.umbrellasService.create({ qrCode: body.qrCode });
  }

  @Get()
  findAll() {
    return this.umbrellasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.umbrellasService.findOne(+id);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: string) {
    return this.umbrellasService.updateStatus(+id, status as any);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.umbrellasService.remove(+id);
  }
}
