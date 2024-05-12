import { PartialType } from '@nestjs/mapped-types';
import { CreateInfraestructuraDto } from './create-infraestructura.dto';
import { IsString, MinLength } from 'class-validator';

export class UpdateInfraestructuraDto extends PartialType(CreateInfraestructuraDto) {

    
    
    @IsString()
    @MinLength(1)
    nombre: string;

}
