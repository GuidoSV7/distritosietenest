import { PartialType } from '@nestjs/mapped-types';
import { CreateTipocolegioDto } from './create-tipocolegio.dto';
import { IsString, MinLength } from 'class-validator';

export class UpdateTipocolegioDto extends PartialType(CreateTipocolegioDto) {

    @IsString()
    @MinLength(1)
    nombre: string;
}
