import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/libs/models/user.model';
import { Address, AddressSchema } from 'src/libs/models/address.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, { name: Address.name, schema: AddressSchema }])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
