import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber, IsString } from "class-validator";

export class CreateDesayunoDto {

    @ApiProperty({
        description: 'Nombre del Desayuno',
        nullable: false,
        minLength: 1,
    })
    @IsString()
    nombre: string;

    @ApiProperty({
        description: 'Cantidad de Desayunos entregados',
        nullable: false
    })
    @IsNumber()
    cantidad: number;

    @ApiProperty({
        description: 'Nombre de la persona encargada',
        nullable: false
    })
    @IsString()
    nombreEntrega: string;

    @ApiProperty({
        description: 'Fecha del desayuno entregado',
        nullable: false
    })
    @IsDate()
    fecha: Date;

    @ApiProperty({
        description: 'ID de la Unidad Educativa a la que pertenece el desayuno',
        nullable: false
    })
    @IsNumber()
    idUnidadEducativa?: number;
}
