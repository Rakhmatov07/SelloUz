import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import mongoose from "mongoose";

export class Character {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'name of character', type: String, example: 'color' })
    key: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'value of character', type: String, example: 'black' })
    value: string;
}

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'product name', type: String })
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'brand Id', type: mongoose.Types.ObjectId })
    brandId: mongoose.Types.ObjectId;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'category Id', type: mongoose.Types.ObjectId })
    categoryId: mongoose.Types.ObjectId;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ description: 'price of product', type: Number })
    price: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'information about product', type: String })
    description: string;

    @IsArray()
    @IsNotEmpty()
    @ApiProperty({ description: 'list of image names', type: [String], example: ['image1.jpg', 'image2.jpg'] })
    images: string[];

    @IsNumber()
    @IsOptional()
    @ApiPropertyOptional({ description: 'discount of product if exists', type: Number })
    discount: number;

    @IsArray()
    @IsNotEmpty()
    @ApiProperty({ description: 'characteristics of product', type: [Character] })
    characteristics: [{
        key: string;
        value: string
    }]
}
