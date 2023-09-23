import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsObject } from "class-validator";
import { IProduct } from "src/libs/types/productOrder";
import { Product } from "./create-order.dto";

export class OrderProductDto {
    @IsObject()
    @IsNotEmpty()
    @ApiProperty({ description: 'product', type: Product })
    product: IProduct;
}