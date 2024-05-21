import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateApoyossocialeDto {
    @IsString()
    nombre: string;

    @IsNumber()
    cantidad: number;

    @IsString()
    nombreEntrega: string;

    @IsDate()
    fecha: Date;

    @IsNumber()
    @IsOptional()
    idUnidadEducativa?: number;
}
