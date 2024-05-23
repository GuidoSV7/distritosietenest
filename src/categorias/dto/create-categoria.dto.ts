import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateCategoriaDto {

    @ApiProperty({
        description: 'Nombre de la Categoria',
        nullable: false
    })
    @IsString()
    nombre: string;
}
