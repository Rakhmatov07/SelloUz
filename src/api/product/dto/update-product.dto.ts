import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsNumber, IsOptional, IsString } from "class-validator";
import { Character } from "./create-product.dto";

export class UpdateProductDto {
    @IsString()
    @IsOptional()
    @ApiPropertyOptional({ description: 'product name', type: String })
    name: string;

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional({ description: 'price of product', type: Number })
    price: number;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({ description: 'information about product', type: String })
    description: string;

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional({ description: 'discount of product if exists', type: Number })
    discount: number;

    @IsArray()
    @IsOptional()    
    @ApiPropertyOptional({ description: 'characteristics of product', type: [Character] })
    characteristics: [{
        key: string;
        value: string
    }]
}
