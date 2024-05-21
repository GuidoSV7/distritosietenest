import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMantenimientoDto {

    @IsString()
    @IsOptional()
    titulo: string;

    @IsDate()
    @IsOptional()
    fecha: Date;

    @IsString()
    @IsOptional()
    encargado: string;

    @IsString()
    @IsOptional()
    empresa: string;

    @IsNumber()
    @IsOptional()
    idUnidadEducativa?: number;
}
