import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UmbrellasService } from './umbrellas.service';
import { CreateUmbrellaDto } from './dto/create-umbrella.dto';
import { UpdateUmbrellaDto } from './dto/update-umbrella.dto';

@Controller('umbrellas')
export class UmbrellasController {
  constructor(private readonly umbrellasService: UmbrellasService) {}

  @Post()
  create(@Body() createUmbrellaDto: CreateUmbrellaDto) {
    return this.umbrellasService.create(createUmbrellaDto);
  }

  @Get()
  findAll() {
    return this.umbrellasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.umbrellasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUmbrellaDto: UpdateUmbrellaDto) {
    return this.umbrellasService.update(+id, updateUmbrellaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.umbrellasService.remove(+id);
  }
}
