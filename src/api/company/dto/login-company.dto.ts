import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsEmail } from "class-validator";

export class LoginCompanyDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'password', type: String })
    password: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ description: 'email', type: String, example: 'example@gmail.com' })
    email: string;
}

