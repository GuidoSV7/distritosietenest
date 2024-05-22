import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateGestioneDto {

    @ApiProperty({
        description: ' Numero operativo de la Gestión',
        nullable: false
    })
    @IsNumber()
    numero: number;

    @ApiProperty({
        description: 'horario de atencion de la reunion',
        nullable: false
    })
    @IsString()
    horario: string;

    @ApiProperty({
        description: 'Nombre del Director de la Gestion',
        nullable: false
    })
    @IsString()
    director: string;

    @ApiProperty({
        description: 'Foto de la Junta Escolar de la Gestion',
        nullable: true
    })
    @IsString()
    juntaescolar: string;
}
