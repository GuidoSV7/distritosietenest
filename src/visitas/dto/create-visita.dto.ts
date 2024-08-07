import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsOptional, IsDate, IsNumber } from "class-validator";

export class CreateVisitaDto {
        @ApiProperty({
        description: 'Titulo del Visita',
        nullable: false,
        minLength: 1,
    })
    @IsString()
    @IsOptional()
    titulo: string;

    @ApiProperty({
        description: 'Fecha del Visita',
        nullable: false
    })
    @IsDate()
    @IsOptional()
    fecha: Date;

    @ApiProperty({
        description: 'Motivo de la Visita',
        nullable: false,
        minLength: 1,
    })
    @IsString()
    @IsOptional()
    motivo: string;

    @ApiProperty({
        description: 'Nombres de los Visitantes',
        nullable: false,
        minLength: 1,
    })
    @IsString()
    @IsOptional()
    visitantes: string;

    @ApiProperty({
        description: 'ID de la Unidad Educativa a la que pertenece la Visita',
        nullable: false
    })
    @IsNumber()
    @IsOptional()
    idUnidadEducativa?: number;
}
