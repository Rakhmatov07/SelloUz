import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsOptional, IsString } from "class-validator";

export class UpdateBrandDto{
    @IsString()
    @IsOptional()
    @ApiPropertyOptional({ description: 'brand name', type: 'string' })
    name: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({ description: 'brand image name', type: 'string', example: 'brand.jpg' })
    image: string;
}