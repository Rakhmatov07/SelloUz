import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { AuthGuard } from 'src/libs/guards/auth.guard';
import { IRequest } from 'src/libs/types/request';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@ApiTags('Review')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post(':productId')
  @ApiBearerAuth()
  @ApiOperation({ summary: "This route to create a review" })
  @UseGuards(AuthGuard)
  create(@Param('productId') productId: string, @Body() createReviewDto: CreateReviewDto, @Req() req: IRequest) {
    return this.reviewService.create(productId, createReviewDto, req);
  }

  @Get()
  @ApiOperation({ summary: "This route to get all reviews" })
  findAll() {
    return this.reviewService.findAll();
  }
}
