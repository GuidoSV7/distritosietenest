import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateApoyosgubernamentaleDto {


    @ApiProperty({
        description: 'Cantidad del Apoyo Gubernamental Entregada',
        nullable: false
    })
    @IsNumber()
    cantidad: number;

    @ApiProperty({
        description: 'Nombre de la persona que entrega el apoyo gubernamental',
        nullable: false
    })
    @IsString()
    nombreEntrega: string;

    @ApiProperty({
        description: 'Fecha del apoyo gubernamental entregado',
        nullable: false
    })
    @IsDate()
    fecha: Date;

    @ApiProperty({
        description: 'ID de la Unidad Educativa a la que pertenece el apoyo gubernamental',
        nullable: false
    })
    @IsNumber()
    idUnidadEducativa: number;

    @ApiProperty({
        description: 'ID de la Categoria a la que pertenece el apoyo gubernamental',
        nullable: false
    })

    @IsNumber()
    idCategoria: number;

}
