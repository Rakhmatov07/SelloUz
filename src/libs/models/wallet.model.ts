import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose , { HydratedDocument } from 'mongoose';
import { cc_number } from '../utils/cc_generate';
import { User } from './user.model';

export type WalletDocument = HydratedDocument<Wallet>;

@Schema()
export class Wallet {
  @Prop({ type: String, default: cc_number(), required: true })
  walletNumber: string;

  @Prop({ type: Number, default: 0, required: true })
  balance: number;

  @Prop({ type: Boolean, default: false, required: true })
  isActive: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, unique: true, required: true, ref: 'User' })
  userId: User;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);