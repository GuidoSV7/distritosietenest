import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';


export class UpdateOficinadistritalDto  {
    @ApiProperty({
        description: 'Encargado de la Oficina Distrital',
        nullable: true
    })
    @IsString()
    @IsOptional()
    encargado: string;

    @ApiProperty({
        description: 'Horario de atencion de la reunion',
        nullable: true,
        required: false
    })
    @IsString()
    @IsOptional()
    horario?: string;

    @ApiProperty({
        description: 'Coordenada X de la ubicación',
        nullable: true,
        required: true
    })
    @IsNumber()
    @IsOptional()
    coordenada_x?: number;

    @ApiProperty({
        description: 'Coordenada Y de la ubicación',
        nullable: true,
        required: true
    })
    @IsNumber()
    @IsOptional()
    coordenada_y?: number;

    @ApiProperty({
        description: 'Dirección de la oficina',
        nullable: true
        
    })
    @IsString()
    @IsOptional()
    direccion?: string;

    @ApiProperty({
        description: 'URL del video de la oficina',
        nullable: true
        
    })
    @IsString()
    @IsOptional()
    videoUrl?: string;

    @ApiProperty({
        description: 'Número de teléfono de la oficina',
        nullable: true
        
    })
    @IsNumber()
    @IsOptional()
    numeroTelefono?: number;

    @ApiProperty({
        description: 'Servicios públicos disponibles en la oficina',
        nullable: true,
        type: [String]
    })
    @IsOptional()
    @IsString({ each: true })
    serviciosPublicos?: string[];
}
