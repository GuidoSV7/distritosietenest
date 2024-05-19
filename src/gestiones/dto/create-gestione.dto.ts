import { IsNumber, IsString } from "class-validator";

export class CreateGestioneDto {

    @IsNumber()
    numero: number;

    @IsString()
    horario: string;

    @IsString()
    director: string;

    @IsString()
    juntaescolar: string;
}
