import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Review, ReviewSchema } from 'src/libs/models/review.model';
import { Order, OrderSchema } from 'src/libs/models/order.model';
import { Product, ProductSchema } from 'src/libs/models/product.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }, { name: Order.name, schema: OrderSchema }, 
      { name: Product.name, schema: ProductSchema }])],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
