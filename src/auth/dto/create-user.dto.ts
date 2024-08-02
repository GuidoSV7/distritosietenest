import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEmail, IsOptional, IsString, MaxLength, isString } from "class-validator";

export class CreateUserDto{

    @ApiProperty({
        description: 'Nombre del Usuario',
        nullable: false
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'Email del Usuario',
        nullable: false
    })
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'Password del Usuario',
        nullable: false
    })
    @IsString()
    @MaxLength(8)
    password: string;

    @ApiProperty({
        description: 'Rol del Usuario',
        nullable: false
    })
    @IsArray()
    @IsOptional()
    roles: string[];


}