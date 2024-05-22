import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateApoyossocialeDto {
    
    @ApiProperty({
        description: 'Nombre del Apoyo Social',
        nullable: false,
        minLength: 1,
    })
    @IsString()
    nombre: string;

    @ApiProperty({
        description: 'Cantidad de Apoyos entregados',
        nullable: false
    })
    @IsNumber()
    cantidad: number;

    @ApiProperty({
        description: 'Nombre de la persona que entrega el apoyo',
        nullable: false,
    })
    @IsString()
    nombreEntrega: string;

    @ApiProperty({
        description: 'Fecha del apoyo entregado',
        nullable: false
    })
    @IsDate()
    fecha: Date;

    @ApiProperty({
        description: 'ID de la Unidad Educativa a la que pertenece el apoyo',
        nullable: false
    })
    @IsNumber()
    @IsOptional()
    idUnidadEducativa?: number;
}
