import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsObject, IsOptional, IsString } from "class-validator";
import { IAddress } from "src/libs/types/address";

export class Address{
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'region', type: String })
    region: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'street', type: String })
    street: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'house', type: String })
    house: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'apartment', type: String })
    apartment: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'entrance', type: String })
    entrance: string
}

export enum Gender {
    male = 'male',
    female = 'female'
}

export class RegisterDto {
    @IsString()
    @IsOptional()
    @ApiPropertyOptional({ description: 'name', type: 'string' })
    name: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({ description: 'surname', type: 'string' })
    surname: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({ description: 'username', type: 'string' })
    username: string;

    @IsDate()
    @IsOptional()
    @ApiPropertyOptional({ description: 'birthday of user', type: Date })
    birthday: Date;

    @IsEnum(Gender)
    @IsOptional()
    @ApiPropertyOptional({ description: 'gender for register " male or female "', type: String })
    public gender: Gender;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({ description: 'profile image', type: String })
    image: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({ description: 'email', type: String, example: 'example@gmail.com' })
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'password', type: String, example: '1223334444' })
    password: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'password', type: String, example: '1223334444' })
    confirmPassword: string;

    @IsObject()
    @IsOptional()
    @ApiPropertyOptional({ description: 'address', type: Address })
    address: IAddress
}
