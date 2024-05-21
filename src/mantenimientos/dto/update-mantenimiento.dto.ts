import { PartialType } from '@nestjs/mapped-types';
import { CreateMantenimientoDto } from './create-mantenimiento.dto';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class UpdateMantenimientoDto extends PartialType(CreateMantenimientoDto) {
   
    @IsString()
    titulo: string;

    @IsDate()
    fecha: Date;

    @IsString()
    encargado: string;

    @IsString()
    empresa: string;

    @IsNumber()
    idUnidadEducativa?: number;

}
