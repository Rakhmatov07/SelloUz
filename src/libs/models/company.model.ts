import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IAddress } from '../types/address';

export type CompanyDocument = HydratedDocument<Company>;

@Schema()
export class Company {
  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: String, required: true })
  description: string;

  @Prop({ type: String, required: true })
  contactNumber: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: String, required: true })
  pinfl: string;

  @Prop({ type: String, required: true })
  image: string;

  @Prop({ type: Boolean, required: true, default: false })
  isChecked: boolean;

  @Prop({ type: String, required: false })
  link: string;

  @Prop({ type: Object, required: true })
  address: IAddress;
}

export const CompanySchema = SchemaFactory.createForClass(Company);