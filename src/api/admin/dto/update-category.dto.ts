import { ApiPropertyOptional } from "@nestjs/swagger"
import { IsOptional, IsString } from "class-validator"

export class UpdateCategoryDto{
    @IsString()
    @IsOptional()
    @ApiPropertyOptional({ description: 'category name', type: 'string' })
    name: string

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({ description: 'parent category id if exists', type: 'string' })
    parentCategoryId: string
}