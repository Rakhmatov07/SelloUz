import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsString, IsOptional, IsObject } from "class-validator";
import { Address } from "src/libs/models/address.model";
import { IAddress } from "src/libs/types/address";

export class UpdateCompanyDto {
    @IsString()
    @IsOptional()
    @ApiPropertyOptional({ description: 'company name', type: String })
    name: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({ description: 'company image name', type: String, example: 'company.jpg' })
    image: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({ description: 'information about company', type: String })
    description: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({ description: 'company website link if exists', type: String, example: 'http://google.com' })
    link: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({ description: 'company contact number', type: String, example: '+998901234567' })
    contactNumber: string;

    @IsObject()
    @IsOptional()
    @ApiPropertyOptional({ description: 'company address', type: Address })
    address: IAddress
}

