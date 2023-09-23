import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsDate, IsEnum, IsObject, IsOptional, IsString } from "class-validator";
import { Gender } from "src/api/auth/dto/register.dto";
import { Address } from "src/libs/models/address.model";
import { IAddress } from "src/libs/types/address";

export class UpdateUserDto {
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
    gender: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({ description: 'profile image', type: String })
    image: string;

    @IsObject()
    @IsOptional()
    @ApiPropertyOptional({ description: 'address', type: Address })
    address: IAddress
}
