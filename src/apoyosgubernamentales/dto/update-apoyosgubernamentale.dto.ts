import { PartialType } from '@nestjs/mapped-types';
import { CreateApoyosgubernamentaleDto } from './create-apoyosgubernamentale.dto';
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateApoyosgubernamentaleDto extends PartialType(CreateApoyosgubernamentaleDto) {


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
