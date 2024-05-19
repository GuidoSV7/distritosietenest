import { IsNumber, IsOptional, IsString, MinLength, IsArray } from "class-validator";

export class CreateUnidadeseducativaDto {

    @IsString()
    @MinLength(1)
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
    idInfraestructura?: number | null;

    @IsNumber()
    @IsOptional()
    idTipoColegio?: number | null;

    @IsNumber()
    @IsOptional()
    idTurno?: number | null;

    @IsNumber()
    @IsOptional()
    idGestione?: number | null;

}
