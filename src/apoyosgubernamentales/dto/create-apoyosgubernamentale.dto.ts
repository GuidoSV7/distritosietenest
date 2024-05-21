import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateApoyosgubernamentaleDto {



    @IsNumber()
    cantidad: number;

    @IsString()
    nombreEntrega: string;

    @IsDate()
    fecha: Date;

    @IsNumber()
    idUnidadEducativa: number;
}
