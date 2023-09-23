import { ConflictException, Injectable, InternalServerErrorException, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Review } from 'src/libs/models/review.model';
import { Model } from 'mongoose';
import { IRequest } from 'src/libs/types/request';
import { Order } from 'src/libs/models/order.model';
import { Product } from 'src/libs/models/product.model';

@Injectable()
export class ReviewService {
  constructor(@InjectModel(Review.name) private readonly reviewModel: Model<Review>,
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    @InjectModel(Product.name) private readonly productModel: Model<Product>){}

  async create(productId: string, createReviewDto: CreateReviewDto, req: IRequest) {
    try {
      let reviews = await this.reviewModel.find({ productId });
      const user = reviews.find(review => review.userId.toString() === req.id.toString());
      if(user) throw new ConflictException('You already commited');

      const order = await this.orderModel.findOne({ userId: req.id });
      // if(!order.isPaid) throw new NotAcceptableException('Not Allowed');

      const product = order.products.find((p) => p.productId.toString() === productId.toString());
      if(!product) throw new NotAcceptableException('Not Allowed');

      const newReview = await this.reviewModel.create({ ...createReviewDto, userId: req.id, productId });
      if(!newReview) throw new NotFoundException('Failed to create');

      reviews = await this.reviewModel.find({ productId });
      const total = reviews.reduce((sum, review) => sum + review.grade, 0);
      const rating = total / reviews.length;

      const updProduct = await this.productModel.findByIdAndUpdate(productId, { $set: {rating} }, { new: true });

      return { message: 'Success', newReview, updProduct };
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findAll() {
    try {
      const reviews = await this.reviewModel.find();
      if(!reviews) throw new NotFoundException('Not Found');

      return { message: 'Success', reviews }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
