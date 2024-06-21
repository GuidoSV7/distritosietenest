import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCentrosdeportivoDto {

    @ApiProperty({
        description: 'Nombre del Centro Deportivo',
    })
    @IsString()
    nombre: string;

    @ApiProperty({
        description: 'Coordenada X del Centro Deportivo',
    })
    @IsNumber()
    coordenada_x: number;

    @ApiProperty({
        description: 'Coordenada Y del Centro Deportivo',
    })
    @IsNumber()
    coordenada_y: number;

    @ApiProperty({
        description: 'Dirección del Centro Deportivo',
    })
    @IsString()
    direccion: string;

    @ApiProperty({
        description: 'UV del Centro Deportivo',
    })
    @IsString()
    uv: string;

    @ApiProperty({
        description: 'Historia del Centro Deportivo',
    })
    @IsString()
    historia: string;

    @ApiProperty({
        description: 'URL del video del Centro Deportivo',
    })
    @IsString()
    @IsOptional()
    videoUrl: string;

    @ApiProperty({
        description: ' Fotos del Centro Deportivo',
        nullable: true,

    })
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    fotos?: string[];
}
