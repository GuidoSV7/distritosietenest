import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateInfraestructuraDto {


    @ApiProperty({
        description: 'Nombre de la Infraestructura',
        nullable: false,
        minLength: 1,
    })
    @IsString()
    @MinLength(1)
    nombre: string;

}
