import { PartialType } from '@nestjs/mapped-types';
import { CreateDesayunoDto } from './create-desayuno.dto';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateDesayunoDto extends PartialType(CreateDesayunoDto) {

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
