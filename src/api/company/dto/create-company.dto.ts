import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsOptional, IsEmail, IsObject } from "class-validator";
import { Address } from "src/api/auth/dto/register.dto";
import { IAddress } from "src/libs/types/address";

export class CreateCompanyDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'company name', type: String })
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'company image name', type: String, example: 'company.jpg' })
    image: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'information about company', type: String })
    description: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'unique PINFL', type: String })
    pinfl: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({ description: 'company website link if exists', type: String, example: 'http://google.com' })
    link: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'company contact number', type: String, example: '+998901234567' })
    contactNumber: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'password', type: String, example: '12334445555' })
    password: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'confirm password', type: String, example: '12334445555' })
    confirmPassword: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ description: 'email', type: String, example: 'example@gmail.com' })
    email: string;

    @IsObject()
    @IsNotEmpty()
    @ApiProperty({ description: 'company address', type: Address })
    address: IAddress
}
