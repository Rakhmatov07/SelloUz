import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../models/user.model';
import { InjectModel } from '@nestjs/mongoose';

const adminEmail = process.env.ADMIN_EMAIL;

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User> ){};
  
  async canActivate( context: ExecutionContext): Promise<boolean> {
      const req = context.switchToHttp().getRequest();
      
    try{
      const admin = await this.userModel.findById(req.id);
      if(!admin) throw new UnauthorizedException('Admin Not Found');

      if(admin.email !== adminEmail) false;
      
      req.admin = admin;
      return true;
    } catch (error) {
        return false
    }
  }
}