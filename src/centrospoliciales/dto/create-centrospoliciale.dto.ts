import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNumber, IsOptional, IsArray } from "class-validator";

export class CreateCentrospolicialeDto {
    @ApiProperty({
        description: 'Nombre del Centro Policial',
    })
    @IsString()
    nombre: string;

    @ApiProperty({
        description: 'Nombre del encargado del Centro Policial',
    })
    @IsString()
    encargado: string;

    @ApiProperty({
        description: 'Coordenada X del Centro Policial',
    })
    @IsNumber()
    coordenada_x: number;

    @ApiProperty({
        description: 'Coordenada Y del Centro Policial',
    })
    @IsNumber()
    coordenada_y: number;

    @ApiProperty({
        description: 'Dirección del Centro Policial',
    })
    @IsString()
    direccion: string;

    @ApiProperty({
        description: 'UV del Centro Policial',
    })
    @IsString()
    uv: string;

    @ApiProperty({
        description: 'Horario del Centro Policial',
    })
    @IsString()
    horario: string;

    @ApiProperty({
        description: 'Foto del Centro Policial',
    })
    @IsString()
    @IsOptional()
    fotoUrl: string;

    @ApiProperty({
        description: 'Numero del Centro Policial',
    })
    @IsNumber()
    numeroTelefono: number;

    @ApiProperty({
        description: 'Servicios públicos disponibles en el Centro Policial',
        nullable: true,
        type: [String]
    })
    @IsOptional()
    @IsString({ each: true })
    serviciosPublicos?: string[];


}
