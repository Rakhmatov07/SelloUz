import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateBrandDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'brand name', type: 'string' })
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'brand image name', type: 'string', example: 'brand.jpg' })
    image: string;
}