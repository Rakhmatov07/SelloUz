import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from 'src/libs/models/order.model';
import { Model } from 'mongoose';
import { IRequest } from 'src/libs/types/request';
import { OrderProductDto } from './dto/order-product.dto';
import { Wallet } from 'src/libs/models/wallet.model';
import { BuyDto } from './dto/buy.dto';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private readonly orderModel: Model<Order>,
    @InjectModel(Wallet.name) private readonly walletModel: Model<Wallet>){}

  async create({ products, deliveryAddress }: CreateOrderDto, req: IRequest) {
    try {
      const order = await this.orderModel.findOne({ userId: req.id });
      if(order) throw new ConflictException('Order already exists, you can add product');

      const newOrder = await this.orderModel.create({ products, deliveryAddress, userId: req.id });
      if(!newOrder) throw new NotFoundException('Failed to Create');

      return { message: 'Success', newOrder };
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async addProductToOrder(orderProductDto: OrderProductDto, req: IRequest) {
    try {
      const updOrder = await this.orderModel.findOneAndUpdate({ userId: req.id }, { $addToSet: orderProductDto }, { new: true });
      if(!updOrder) throw new NotFoundException('Failed to add');

      return { message: 'Success', updOrder };
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findOrder(req: IRequest) {
    try {
      const order = await this.orderModel.findOne({ userId: req.id });
      if(!order) throw new NotFoundException('Not Found');

      return { message: 'Success', order };
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async buy(req: IRequest, { total }: BuyDto){
    const session = await this.walletModel.startSession();
    try {
      session.startTransaction();
      
      const clientWallet = await this.walletModel.findOneAndUpdate({ userId: req.id, isActive: true }, 
        { $inc: { balance: -total } }, { new: true }).session(session);
        
      const selloWallet = await this.walletModel.findOneAndUpdate({ name: "sello" }, // sello wallet is inserted to db manually
      { $inc: { balance: total } }, { new: true }).session(session);

      
      await session.commitTransaction();
      session.endSession();
      await this.orderModel.findOneAndUpdate({ userId: req.id }, { $set: { isPaid: true } });
      
      return { message: 'Success', clientWallet, selloWallet };
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw new InternalServerErrorException(error)
    }
  }

  async increaseProductCount(productId: string, req: IRequest){
    try {
      const order = await this.orderModel.findOneAndUpdate(
        { userId: req.id, 'products.productId': productId },
        { $inc: { 'products.$.count': 1 } },
        { new: true }
      );
  
      if (!order) {
        throw new NotFoundException(`Order not found for user with ID ${req.id}`);
      }

      return { message: 'Success', order }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async decreaseProductCount(productId: string, req: IRequest){
    try {
      const order = await this.orderModel.findOneAndUpdate(
        { userId: req.id, 'products.productId': productId, 'products.count': { $gt: 0 } },
        { $inc: { 'products.$.count': -1 } },
        { new: true }
      );
  
      if (!order) {
        throw new NotFoundException(`Order not found for user with ID ${req.id}`);
      }
  
      if (!order.products.find(product => product.productId === productId)) {
        throw new NotFoundException(`Product with ID ${productId} not found in the order`);
      }
  
      return { message: 'Success', order };
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async removeProductFromOrder(productId: string, req: IRequest) {
    try {
      const order = await this.orderModel.findOne({ userId: req.id });
      const updProducts = order.products.filter((product) => product.productId !== productId);
      order.products = updProducts;
      await order.save();

      return { message: 'Success', order }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
