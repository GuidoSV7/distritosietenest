import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNumber, IsString } from "class-validator";

export class SearchLabelsDto {

    @ApiProperty({
        description: 'Url de la Imagen',
        nullable: false,
        minLength: 1,
    })
    @IsString()
    imageUrl: string;


}
