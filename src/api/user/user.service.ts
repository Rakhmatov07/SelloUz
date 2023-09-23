import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/libs/models/user.model';
import mongoose, { Model } from 'mongoose';
import { Address } from 'src/libs/models/address.model';
import { IRequest } from 'src/libs/types/request';
import { UpdateUserDto } from './dto/updateUser.dto';


@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>){}

  async addProductToFavourites(req: IRequest, productId: string){
    try {
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new BadRequestException('Invalid productId');
      }
  
      const updatedUser = await this.userModel.findByIdAndUpdate(
        req.id,
        { $addToSet: { favourites: productId } },
        { new: true }
      );
  
      if (!updatedUser) {
        throw new NotFoundException(`User with ID ${req.id} not found`);
      }
  
      return { message: 'Success', updatedUser };
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findFavourites(req: IRequest){
    try {
      const user = await this.userModel.findById(req.id);
      if(!user.favourites) throw new NotFoundException('Not Found');

      return { message: 'Success', favourites: user.favourites }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findOwnProfile(req: IRequest) {
    try {
      const profile = await this.userModel.findById(req.id);
      if(!profile) throw new NotFoundException('Not Found');

      return { message: 'Success', profile }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async updateProfile(updateUserDto: UpdateUserDto, req: IRequest) {
    try {
      const updProfile = await this.userModel.findByIdAndUpdate(req.id, { $set: updateUserDto }, { new: true }).exec();
      return { message: 'Success', updProfile }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async removeProductFromFavourites(req: IRequest, productId: mongoose.Types.ObjectId){
    try {
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw new BadRequestException('Invalid productId');
      }

      const user = await this.userModel.findById(req.id);
      if(!user) throw new NotFoundException(`User with ID ${req.id} not found`);

      user.favourites = user.favourites.filter(product => product.toString() !== productId.toString());
       
      await user.save();

      return { message: 'Success', user }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
