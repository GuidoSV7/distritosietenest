import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, MinLength } from "class-validator";

export class CreateCentrosaludhasespecialidadeDto {

     @ApiProperty({
        description: 'Nombre del encargado de la Especialidad',
        nullable: false,
        minLength: 1,
    })
    @IsString()
    @MinLength(1)
    encargado: string;

    @ApiProperty({
        description: 'Id del Centro de Salud',
        nullable: false,
    })
    @IsNumber()
    idCentroSalud: number;

    @ApiProperty({
        description: 'Id de la Especialidad',
        nullable: false,
    })
    @IsNumber()
    idEspecialidad: number;
}
