import { PartialType } from '@nestjs/mapped-types';
import { CreateUnidadeseducativaDto } from './create-unidadeseducativa.dto';

export class UpdateUnidadeseducativaDto extends PartialType(CreateUnidadeseducativaDto) {}
