import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class CreateTipocolegioDto {

    @ApiProperty({
        description: 'Nombre del Tipo de Colegio',
        nullable: false,
        minLength: 1,
    })
    @IsString()
    @MinLength(1)
    nombre: string;
}
