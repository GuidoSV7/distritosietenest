import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber, IsString } from "class-validator";

export class CreateDenunciaDto {

    @ApiProperty({
        description: 'Texto de la Denuncia',
        nullable: false,
        minLength: 1,
    })
    @IsString()
    texto: string;

    @ApiProperty({
        description: 'ID de la Unidad Educativa a la que pertenece la Denuncia',
        nullable: false
    })
    @IsNumber()
    idUnidadEducativa?: number;
}
