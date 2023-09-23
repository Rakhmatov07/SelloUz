import { ConflictException, ForbiddenException, Inject, Injectable, InternalServerErrorException, RequestTimeoutException } from '@nestjs/common';
import { CreateCompanyDto, LoginCompanyDto, UpdateCompanyDto } from './dto';
import { Cache } from 'cache-manager';
import { VerifyDto } from '../auth/dto';
import { InjectModel } from '@nestjs/mongoose';
import { Company } from 'src/libs/models/company.model';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { codeGenerator } from 'src/libs/utils/code_generate';
import { compare, hash } from 'bcrypt';
import { MailerService } from 'src/libs/utils/mailer.service';
import { IRequest } from 'src/libs/types/request';

const salt = process.env.SALT;

@Injectable()
export class CompanyService {
  constructor(@InjectModel(Company.name) private readonly companyModel: Model<Company>, private readonly mailerService: MailerService , 
  private readonly jwtService: JwtService, @Inject(CACHE_MANAGER) private cacheManager: Cache){}

  async register({ password, confirmPassword, email, ...data }: CreateCompanyDto) {
    try {
      const company = await this.companyModel.findOne({ email, pinfl: data.pinfl });
      if(company) throw new ConflictException('Email already exists!');

      if(password !== confirmPassword) throw new ConflictException('Not Same Password');
      const code = codeGenerator();

      await this.cacheManager.set(email, {code, limits: 3}, 120000);
      await this.mailerService.sendEmail(email, 'Registration', 'Do you agree to register?', `<b>Hey there!</b><br> Your verification code: ${code}.<br/>`);
      
      const hashedPass = await hash(password, +salt);
      const newCompany = new this.companyModel({
        ...data, password: hashedPass, email
      });
      
      await this.cacheManager.set('newCompany', newCompany, 3600000);
      return { message: 'Verify Your Email' }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async verifyEmail(verifyDto: VerifyDto){
    try {
      const cacheData: { code: number, limits: number } = await this.cacheManager.get(verifyDto.email);
      
      if(!cacheData) throw new RequestTimeoutException('Time is expired');
      if(cacheData?.limits === 0) return { message: 'Attempt is over' };
      
      if(cacheData.code !== verifyDto.code){
        const code = codeGenerator();
        await this.cacheManager.set(verifyDto.email, {code, limits: cacheData.limits - 1}, 120000);
        await this.mailerService.sendEmail(verifyDto.email, 'Registration', 'Do you agree to register?', `<b>Hey there!</b><br> Your verification code: ${code}.<br/>`);

        return { message: 'Invalid Verification Code. Try again!' }
      }

      const newCompany: any = await this.cacheManager.get('newCompany');
      await newCompany.save();

      const token = this.jwtService.sign({ id: newCompany.id });
      return { message: 'Success', token }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async login({ email, password }: LoginCompanyDto) {
    try {
      const company = await this.companyModel.findOne({ email });
      if(!company) throw new ForbiddenException('Invalid email or password!');

      const checkPass = await compare(password, company.password);
      if(!checkPass) throw new ForbiddenException('Invalid email or password!');

      const token = this.jwtService.sign({ id: company.id });
      return { message: 'Success', token }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  logout() {
    return { message: 'Success', token: '' }
  }

  async findOwnProfile(req: IRequest) {
    try {
      const id = req.id;
      const company = await this.companyModel.findById(id);

      return { message: 'Success', company };
    } catch (error) {
      throw new InternalServerErrorException(error);
    };
  }

  async updateProfile(updateCompanyDto: UpdateCompanyDto, req: IRequest) {
    try {
      const updCompany = await this.companyModel.findByIdAndUpdate(req.id, {$set: updateCompanyDto}, { new: true });

      return { message: 'Success', updCompany };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
