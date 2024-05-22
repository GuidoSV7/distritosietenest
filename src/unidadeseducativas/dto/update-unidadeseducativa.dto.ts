//import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { CreateUnidadeseducativaDto } from './create-unidadeseducativa.dto';


export class UpdateUnidadeseducativaDto extends PartialType(CreateUnidadeseducativaDto) {}
