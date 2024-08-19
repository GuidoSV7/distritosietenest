import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCentrosturisticoDto {
    @ApiProperty({
        description: 'Nombre del Centro Turistico',
    })
    @IsString()
    nombre: string;

    @ApiProperty({
        description: 'Coordenada X del Centro Turistico',
    })
    @IsNumber()
    coordenada_x: number;

    @ApiProperty({
        description: 'Coordenada Y del Centro Turistico',
    })
    @IsNumber()
    coordenada_y: number;

    @ApiProperty({
        description: 'Dirección del Centro Turistico',
    })
    @IsString()
    direccion: string;

    @ApiProperty({
        description: 'UV del Centro Turistico',
    })
    @IsString()
    uv: string;

    @ApiProperty({
        description: 'Historia del Centro Turistico',
    })
    @IsString()
    historia: string;

    @ApiProperty({
        description: 'URL del video del Centro Turistico',
    })
    @IsString()
    @IsOptional()
    videoUrl: string;

    @ApiProperty({
        description: ' Fotos del Centro Turistico',
        nullable: true,

    })
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    fotos?: string[];

    @ApiProperty({
        description: 'Servicios públicos disponibles en el Centro Policial',
        nullable: true,
        type: [String]
    })
    @IsOptional()
    @IsString({ each: true })
    serviciosPublicos?: string[];
}
