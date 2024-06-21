import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateEspecialidadeDto {
    @ApiProperty({
        description: 'Nombre de la Especialidad',
    })
    @IsString()
    nombre: string;

    

}
