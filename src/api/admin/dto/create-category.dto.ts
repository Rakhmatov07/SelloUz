import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CreateCategoryDto{
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'category name', type: 'string' })
    name: string

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({ description: 'parent category id if exists', type: 'string' })
    parentCategoryId: string
}