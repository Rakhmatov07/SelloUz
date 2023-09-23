import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsPositive } from "class-validator";

export class BuyDto{
    @IsNumber()
    @IsPositive()
    @ApiProperty({ description: 'total sum of order', type: Number })
    total: number
}