import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category {
  @Prop({ type: String, required: true, min: 3 })
  name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Category' })
  parentCategoryId: mongoose.Types.ObjectId;
}

export const CategorySchema = SchemaFactory.createForClass(Category);