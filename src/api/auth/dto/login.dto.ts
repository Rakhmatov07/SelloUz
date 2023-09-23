import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ description: 'email', type: String, example: 'example@gmail.com' })
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'password', type: String, example: '1223334444' })
    password: string;
}
