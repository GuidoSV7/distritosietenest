import { IsEmail, IsString, MaxLength, isString } from "class-validator";

export class CreateUserDto{

    @IsString()
    name: string;

    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MaxLength(8)
    password: string;


}