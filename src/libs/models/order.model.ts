import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { IProduct } from '../types/productOrder';
import { IAddress } from '../types/address';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop({ type: [Object], required: true })
  products: IProduct[];

  @Prop({ type: Object, required: true })
  deliveryAddress: IAddress;

  @Prop({ type: Boolean, required: true, default: false })
  isPaid: boolean;

  @Prop({ type: Boolean, required: true, default: false })
  isDelivered: boolean;

  @Prop({ type: mongoose.Types.ObjectId, required: true, ref: 'User' })
  userId: mongoose.Types.ObjectId;
}

export const OrderSchema = SchemaFactory.createForClass(Order);