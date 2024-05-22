import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMantenimientoDto {

    @ApiProperty({
        description: 'Titulo del Mantenimiento',
        nullable: false,
        minLength: 1,
    })
    @IsString()
    @IsOptional()
    titulo: string;

    @ApiProperty({
        description: 'Fecha del Mantenimiento',
        nullable: false
    })
    @IsDate()
    @IsOptional()
    fecha: Date;

    @ApiProperty({
        description: 'Nombre de la Persona Encargada del Mantenimiento',
        nullable: false,
        minLength: 1,
    })
    @IsString()
    @IsOptional()
    encargado: string;

    @ApiProperty({
        description: 'Empresa que realizo el Mantenimiento',
        nullable: false
    })
    @IsString()
    @IsOptional()
    empresa: string;

    @ApiProperty({
        description: 'ID de la Unidad Educativa a la que pertenece el Mantenimiento',
        nullable: false
    })
    @IsNumber()
    @IsOptional()
    idUnidadEducativa?: number;
}
