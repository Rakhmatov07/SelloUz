import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type AddressDocument = HydratedDocument<Address>;

@Schema()
export class Address {
  @Prop({ type: String, required: true })
  region: string;

  @Prop({ type: String, required: true })
  street: string;

  @Prop({ type: String, required: true })
  house: string;

  @Prop({ type: String, required: true })
  apartment: string;

  @Prop({ type: String, required: true })
  entrance: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' })
  userId: mongoose.Types.ObjectId;
}

export const AddressSchema = SchemaFactory.createForClass(Address);