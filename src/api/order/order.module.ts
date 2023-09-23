import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from 'src/libs/models/order.model';
import { Wallet, WalletSchema } from 'src/libs/models/wallet.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }, { name: Wallet.name, schema: WalletSchema }])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
