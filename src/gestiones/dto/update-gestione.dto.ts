import { PartialType } from '@nestjs/mapped-types';
import { CreateGestioneDto } from './create-gestione.dto';
import { IsNumber, IsString } from 'class-validator';

export class UpdateGestioneDto extends PartialType(CreateGestioneDto) {

    @IsNumber()
    numero: number;

    @IsString()
    horario: string;

    @IsString()
    director: string;

    @IsString()
    juntaescolar: string;
}
