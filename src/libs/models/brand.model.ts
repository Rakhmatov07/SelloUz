import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type BrandDocument = HydratedDocument<Brand>;

@Schema()
export class Brand {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  image: string;
}

export const BrandSchema = SchemaFactory.createForClass(Brand);