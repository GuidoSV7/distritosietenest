import { ApiProperty } from "@nestjs/swagger";
import { IsString, MinLength } from "class-validator";

export class CreateNumerosemergenciaDto {
    @ApiProperty({
        description: 'Nombre del numero de emergencia',
        nullable: false,
        minLength: 1,
    })
    @IsString()
    @MinLength(1)
    nombre: string;
}
