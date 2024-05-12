import { IsString, MinLength } from "class-validator";

export class CreateTipocolegioDto {
    @IsString()
    @MinLength(1)
    nombre: string;
}
