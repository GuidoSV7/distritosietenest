import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class SafeSearchDto {

    @ApiProperty({
        description: 'Url de la Imagen',
        nullable: false,
        minLength: 1,
    })
    @IsString()
    imageUrl: string;


}