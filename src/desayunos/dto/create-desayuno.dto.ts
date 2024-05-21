import { IsDate, IsNumber, IsString } from "class-validator";

export class CreateDesayunoDto {

    
    @IsString()
    nombre: string;

    @IsNumber()
    cantidad: number;

    @IsString()
    nombreEntrega: string;

    @IsDate()
    fecha: Date;

    @IsNumber()
    idUnidadEducativa?: number;
}
