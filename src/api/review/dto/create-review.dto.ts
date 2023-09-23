import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateReviewDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'comment text', type: String })
    comment: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ description: 'grade for product from 1 to 5', type: Number })
    grade: number;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({ description: 'image to prove', type: String, example: 'image.jpg' })
    image: string;
}
