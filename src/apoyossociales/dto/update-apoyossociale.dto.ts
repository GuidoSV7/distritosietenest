import { PartialType } from '@nestjs/mapped-types';
import { CreateApoyossocialeDto } from './create-apoyossociale.dto';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateApoyossocialeDto extends PartialType(CreateApoyossocialeDto) {


    @IsString()
    @IsOptional()
    nombre: string;

    @IsNumber()
    @IsOptional()
    cantidad: number;

    @IsString()
    @IsOptional()
    nombreEntrega: string;

    @IsDate()
    @IsOptional()
    fecha: Date;

    @IsNumber()
    @IsOptional()
    idUnidadEducativa?: number;

    
}
