//import { PartialType } from '@nestjs/mapped-types';
import { PartialType } from '@nestjs/swagger';
import { CreateInfraestructuraDto } from './create-infraestructura.dto';


export class UpdateInfraestructuraDto extends PartialType(CreateInfraestructuraDto) {}
