import { PartialType } from '@nestjs/swagger';
import { CreateCentrossaludDto } from './create-centrossalud.dto';

export class UpdateCentrossaludDto extends PartialType(CreateCentrossaludDto) {}
