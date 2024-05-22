//import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { CreateGestioneDto } from './create-gestione.dto';


export class UpdateGestioneDto extends PartialType(CreateGestioneDto) {}
