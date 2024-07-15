import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateGestioneDto {

    @ApiProperty({
        description: ' Numero operativo de la Gestión',
        nullable: false
    })
    @IsNumber()
    @IsOptional()
    numero: number;

    @ApiProperty({
        description: 'horario de atencion de la reunion',
        nullable: false,
        required: false
    })
    @IsString()
    @IsOptional()
    horario?: string;

    @ApiProperty({
        description: 'Nombre del Director de la Gestion',
        nullable: false,
        required: false
    })
    @IsString()
    @IsOptional()
    director?: string;

    @ApiProperty({
        description: 'Foto de la Junta Escolar de la Gestion',
        nullable: true,
        required: false
    })
    @IsString()
    @IsOptional()
    juntaescolar?: string;

}
