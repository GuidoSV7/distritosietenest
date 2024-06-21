import { PartialType } from '@nestjs/swagger';
import { CreateCentrosturisticoDto } from './create-centrosturistico.dto';

export class UpdateCentrosturisticoDto extends PartialType(CreateCentrosturisticoDto) {}
