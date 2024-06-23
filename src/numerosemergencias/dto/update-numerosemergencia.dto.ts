import { PartialType } from '@nestjs/swagger';
import { CreateNumerosemergenciaDto } from './create-numerosemergencia.dto';

export class UpdateNumerosemergenciaDto extends PartialType(CreateNumerosemergenciaDto) {}
