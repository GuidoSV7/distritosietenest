import { PartialType } from '@nestjs/mapped-types';
import { CreateUnidadeseducativaDto } from './create-unidadeseducativa.dto';
import { IsNumber, IsOptional, IsString, MinLength, IsArray } from "class-validator";


export class UpdateUnidadeseducativaDto extends PartialType(CreateUnidadeseducativaDto) {

    @IsString()
    @MinLength(1)
    @IsOptional()
    nombre: string;

    @IsNumber()
    @IsOptional()
    coordenada_x?: number;

    @IsNumber()
    @IsOptional()
    coordenada_y?: number;

    @IsString()
    @IsOptional()
    direccion?: string;
    
    @IsString()
    @IsOptional()
    historia?: string;
    
    @IsString()
    @IsOptional()
    video?: string;


    @IsString()
    @IsOptional()
    slug?: string;

    
    @IsString({ each: true })
    @IsArray()
    @IsOptional()
    fotos?: string[];

    @IsNumber()
    @IsOptional()
    idInfraestructura?: number;

    @IsNumber()
    @IsOptional()
    idTipoColegio?: number;


    @IsNumber()
    @IsOptional()
    idTurno?: number;

    @IsNumber()
    @IsOptional()
    idGestione?: number;




}
