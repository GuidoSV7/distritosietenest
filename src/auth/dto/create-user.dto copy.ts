import { IsEmail, IsString, MaxLength, isString } from "class-validator";

export class LoginUserDto{



    @IsString()
    @IsEmail()
    email: string;

    @IsString()
    @MaxLength(8)
    password: string;


}