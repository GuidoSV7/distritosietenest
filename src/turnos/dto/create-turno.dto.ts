import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class CreateTurnoDto {

    @ApiProperty({
        description: 'Nombre del Turno',
        nullable: false,
        minLength: 1,
    })
    @IsString()
    @MinLength(1)
    nombre: string;
}
