import { PartialType } from '@nestjs/swagger';
import { CreateCentrospolicialeDto } from './create-centrospoliciale.dto';

export class UpdateCentrospolicialeDto extends PartialType(CreateCentrospolicialeDto) {}
