import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Product } from './product.model';
import { User } from './user.model';

export type ReviewDocument = HydratedDocument<Review>;

@Schema()
export class Review {
  @Prop({ type: String, required: true, min: 1 })
  comment: string;

  @Prop({ type: Number, required: true, enum: [1, 2, 3, 4, 5] })
  grade: number;

  @Prop({ type: String, required: false })
  image: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' })
  productId: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' })
  userId: mongoose.Types.ObjectId;
}

export const ReviewSchema = SchemaFactory.createForClass(Review);