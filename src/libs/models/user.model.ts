import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IAddress } from '../types/address';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ type: String, required: false, min: 3 })
  name: string;

  @Prop({ type: String, required: false, min: 3 })
  surname: string;

  @Prop({ type: String, required: false, min: 3, unique: true })
  username: string;

  @Prop({ type: String, required: false, enum: [ 'male', 'female' ]})
  gender: string;
  
  @Prop({ type: Date, required: false })
  birthday: Date;

  @Prop({ type: String, required: true, unique: true })
  email: string;

  @Prop({ type: String, required: true, min: 8 })
  password: string;

  @Prop({ type: String, required: false })
  image: string;

  @Prop({ type: [mongoose.Types.ObjectId], required: false, default: [] })
  favourites: mongoose.Types.ObjectId[];

  @Prop({ type: Object, required: false })
  address: IAddress
}

export const UserSchema = SchemaFactory.createForClass(User);