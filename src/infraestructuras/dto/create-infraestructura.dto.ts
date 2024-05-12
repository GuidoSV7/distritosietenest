import { IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateInfraestructuraDto {


    @IsString()
    @MinLength(1)
    nombre: string;

}
