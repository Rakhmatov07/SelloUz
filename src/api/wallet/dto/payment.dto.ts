import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsPositive, IsString } from "class-validator";

export class PaymentDto{
    @IsNumber()
    @IsPositive()
    @ApiProperty({ description: 'amount of money to fill balance', type: Number })
    amount: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'payment Id from stripe', type: String })
    paymentId: string;
}