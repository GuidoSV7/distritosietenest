import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsString, MinLength, IsArray, ValidateNested } from "class-validator";
import { CreateGestioneDto } from "src/gestiones/dto/create-gestione.dto";

export class CreateUnidadeseducativaDto {

    @ApiProperty({
        description: 'Nombre de la Unidad Educativa',
        nullable: false,
        minLength: 1,
    })
    @IsString()
    @MinLength(1)
    nombre: string;

    @ApiProperty({
        description: 'Coordenada X de la Unidad Educativa',
        nullable: false,

    })
    @IsNumber()
    @IsOptional()
    coordenada_x?: number;

    @ApiProperty({
        description: 'Coordenada Y de la Unidad Educativa',
        nullable: false,

    })
    @IsNumber()
    @IsOptional()
    coordenada_y?: number;


    @ApiProperty({
        description: 'Dirección de la Unidad Educativa',
        nullable: false,

    })
    @IsString()
    @IsOptional()
    direccion?: string;
    

    @ApiProperty({
        description: 'Historia de la Unidad Educativ',
        nullable: false,

    })
    @IsString()
    @IsOptional()
    historia?: string;

    @ApiProperty({
        description: 'Video de la Unidad Educativa URL',
        nullable: true,

    }) 
    @IsString()
    @IsOptional()
    video?: string;


    @ApiProperty({
        description: 'Slug de la Unidad Educativa, Lo crea automaticamente el sistema',
        nullable: false,

    })
@IsString()
    @IsOptional()
    slug?: string;

    @ApiProperty({
        description: ' Fotos de la Unidad Educativa URL',
        nullable: true,

    })
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    fotos?: string[];

    @ApiProperty({
        description: 'Id de la Infraestructura de la Unidad Educativa',
        nullable: false,

    })

    @IsNumber()
    @IsOptional()
    idInfraestructura?: number | null;


    @ApiProperty({
        description: 'Id del TipoColegio de la Unidad Educativa',
        nullable: false,

    })
    @IsNumber()
    @IsOptional()
    idTipoColegio?: number | null;

    @ApiProperty({
        description: 'Id del Turno de la Unidad Educativa',
        nullable: false,

    })
    @IsNumber()
    @IsOptional()
    idTurno?: number | null;


    @ApiProperty({
        description: 'Datos de la Gestion de la UE',
        nullable: true,
        type: CreateGestioneDto
      })
      @IsOptional()
      @ValidateNested({ each: true })
      @Type(() => CreateGestioneDto) 
      gestion?: CreateGestioneDto[];

}
