import { PartialType } from '@nestjs/swagger';
import { CreateUmbrellaDto } from './create-umbrella.dto';

export class UpdateUmbrellaDto extends PartialType(CreateUmbrellaDto) {}
