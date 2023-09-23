import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/libs/models/user.model';
import { JwtModule } from '@nestjs/jwt';
import { LibsModule } from 'src/libs/libs.module';
import { CacheModule } from '@nestjs/cache-manager';
import { Wallet, WalletSchema } from 'src/libs/models/wallet.model';

const jwt_key = process.env.JWT_KEY;

@Module({
  imports: [ LibsModule,
    JwtModule.register({
    global: true,
    secret: jwt_key,
    signOptions: { expiresIn: '24h' },
  }),
  MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, { name: Wallet.name, schema: WalletSchema }]),
  CacheModule.register()],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
