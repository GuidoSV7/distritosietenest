import { IsString, MinLength } from "class-validator";

export class CreateTurnoDto {

    @IsString()
    @MinLength(1)
    nombre: string;
}
