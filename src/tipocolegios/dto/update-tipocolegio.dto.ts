//import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { CreateTipocolegioDto } from './create-tipocolegio.dto';

export class UpdateTipocolegioDto extends PartialType(CreateTipocolegioDto) {}
