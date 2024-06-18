import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCentrossaludDto {

    @ApiProperty({
        description: 'Nombre del Centro de Salud',
    })
    @IsString()
    nombre: string;

    @ApiProperty({
        description: 'Coordenada X del Centro de Salud',
    })
    @IsNumber()
    coordenada_x: number;

    @ApiProperty({
        description: 'Coordenada Y del Centro de Salud',
    })
    @IsNumber()
    coordenada_y: number;

    @ApiProperty({
        description: 'Dirección del Centro de Salud',
    })
    @IsString()
    direccion: string;

    @ApiProperty({
        description: 'UV del Centro de Salud',
    })
    @IsString()
    uv: string;

    @ApiProperty({
        description: 'Horario del Centro de Salud',
    })
    @IsString()
    horario: string;

    @ApiProperty({
        description: 'Nivel del Centro de Salud',
    })
    @IsNumber()
    nivel: number;

    @ApiProperty({
        description: 'URL del video del Centro de Salud',
    })
    @IsString()
    @IsOptional()
    video: string;

    @ApiProperty({
        description: 'URL de la página web del Centro de Salud',
    })
    @IsString()
    @IsOptional()
    paginaweburl: string;

    @ApiProperty({
        description: ' Fotos del Centro de Salud',
        nullable: true,

    })
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    fotos?: string[];

    @ApiProperty({
        description: 'Especialidades del Centro de Salud',
        nullable: true,

    })
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    especialidades?: string[]
    
}
