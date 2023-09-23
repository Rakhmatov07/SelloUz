import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Model } from 'mongoose';
import { Company } from '../models/company.model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CheckedGuard implements CanActivate {
  constructor(@InjectModel(Company.name) private readonly companyModel: Model<Company> ){};
  
  async canActivate( context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
      
    try {
      const company = await this.companyModel.findById(req.id);
      
      if (!company) {
        throw new UnauthorizedException('Company Not Found');
      }

      if (!company.isChecked) {
        return false;
      }

      return true;
    } catch (error) {
      return false;
    }
  }
}
