//import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { CreateTurnoDto } from './create-turno.dto';

export class UpdateTurnoDto extends PartialType(CreateTurnoDto) {}
