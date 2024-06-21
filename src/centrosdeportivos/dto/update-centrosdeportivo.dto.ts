import { PartialType } from '@nestjs/swagger';
import { CreateCentrosdeportivoDto } from './create-centrosdeportivo.dto';

export class UpdateCentrosdeportivoDto extends PartialType(CreateCentrosdeportivoDto) {}
