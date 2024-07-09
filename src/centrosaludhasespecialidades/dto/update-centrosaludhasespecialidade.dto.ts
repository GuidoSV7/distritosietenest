import { PartialType } from '@nestjs/swagger';
import { CreateCentrosaludhasespecialidadeDto } from './create-centrosaludhasespecialidade.dto';

export class UpdateCentrosaludhasespecialidadeDto extends PartialType(CreateCentrosaludhasespecialidadeDto) {}
