import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { ICharacter } from '../types/productCharacter';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop({ type: String, required: true, min: 3 })
  name: string;

  @Prop({ type: String, required: true, min: 5 })
  description: string;

  @Prop({ type: [String], required: true })
  images: string[];

  @Prop({ type: Boolean, default: true, required: true })
  isAvailable: boolean;

  @Prop({ type: Object, required: true })
  characteristics: ICharacter[];

  @Prop({ type: Number, required: false, default: 0 })
  discount: number;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: Number, required: true, default: 0 })
  sold: number;

  @Prop({ type: Number, required: true, default: 0 })
  rating: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Brand' })
  brandId: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Company' })
  companyId: mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Category' })
  categoryId: mongoose.Types.ObjectId;
}

export const ProductSchema = SchemaFactory.createForClass(Product);