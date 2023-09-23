import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wallet } from 'src/libs/models/wallet.model';
import { IRequest } from 'src/libs/types/request';
import { Stripe } from 'stripe';
import { PaymentDto } from './dto/payment.dto';

const stripe_sc_key = process.env.STRIPE_SC_KEY;

@Injectable()
export class WalletService {
  private readonly stripe = new Stripe(stripe_sc_key, { apiVersion: '2023-08-16' })
  constructor(@InjectModel(Wallet.name) private readonly walletModel: Model<Wallet>){}

  async findWallet(req: IRequest) {
    try {
      const wallet = await this.walletModel.findOne({ userId: req.id });
      if(!wallet) throw new NotFoundException('Not Found');

      return { message: 'Success', wallet }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async activateWallet(req: IRequest){
    try {
      const activeWallet = await this.walletModel.findOneAndUpdate({ userId: req.id }, { $set: { isActive: true } }, { new: true });
      if(!activeWallet) throw new NotFoundException('Wallet not found');

      return { message: 'Success', activeWallet }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async inActivateWallet(req: IRequest){
    try {
      const inactiveWallet = await this.walletModel.findOneAndUpdate({ userId: req.id }, { $set: { isActive: false } }, { new: true });
      if(!inactiveWallet) throw new NotFoundException('Wallet not found');

      return { message: 'Success', inactiveWallet }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async fillBalance(req: IRequest, { amount, paymentId }: PaymentDto) {
    try {
      const wallet = await this.walletModel.findOne({ userId: req.id, isActive: true });
      if (!wallet)  throw new NotFoundException('Wallet not found or inactive');

      await this.stripe.paymentIntents.create({
        amount: amount,
        currency: 'USD',
        description: 'Adding balance to wallet',
        payment_method: paymentId,
        confirm: true,
        return_url: 'http://localhost:3000/'
      });

      wallet.balance += amount;
      await wallet.save();

      return { message: 'Payment was successful', success: true }
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException(error)
    }
  }
}
