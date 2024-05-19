import { PartialType } from '@nestjs/mapped-types';
import { CreateTurnoDto } from './create-turno.dto';
import { IsString, MinLength } from 'class-validator';

export class UpdateTurnoDto extends PartialType(CreateTurnoDto) {
    @IsString()
    @MinLength(1)
    nombre: string;
}
