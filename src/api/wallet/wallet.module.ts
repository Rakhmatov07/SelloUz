import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Wallet, WalletSchema } from 'src/libs/models/wallet.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: Wallet.name, schema: WalletSchema }])],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
