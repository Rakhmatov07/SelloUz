import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsObject, IsPositive, IsString } from "class-validator";
import mongoose from "mongoose";
import { Address } from "src/libs/models/address.model";
import { IAddress } from "src/libs/types/address";
import { IProduct } from "src/libs/types/productOrder";

export class Product {
    @IsString()
    @IsNotEmpty()
    productId: string;

    @IsNumber()
    @IsPositive()
    count: number;
}

export class CreateOrderDto {
    @IsArray()
    @IsNotEmpty()
    @ApiProperty({ description: 'products\'s list', type: [Product] })
    products: IProduct[];

    @IsObject()
    @IsNotEmpty()
    @ApiProperty({ description: 'delivery address', type: Address })
    deliveryAddress: IAddress;
}
