import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber } from "class-validator";

export class VerifyDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ description: 'email', type: String, example: 'example@gmail.com' })
    email: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ description: 'verification code', type: Number })
    code: number;
}