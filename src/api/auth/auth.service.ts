import { Injectable, InternalServerErrorException, ConflictException, Inject, RequestTimeoutException, ForbiddenException } from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { Cache } from 'cache-manager';
import { LoginDto, RegisterDto, VerifyDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from 'src/libs/models/user.model';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { codeGenerator } from 'src/libs/utils/code_generate';
import { MailerService } from 'src/libs/utils/mailer.service';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Wallet } from 'src/libs/models/wallet.model';
import { cc_number } from 'src/libs/utils/cc_generate';

const salt = process.env.SALT;

@Injectable()
export class AuthService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>, private readonly mailerService: MailerService , 
  private readonly jwtService: JwtService, @Inject(CACHE_MANAGER) private cacheManager: Cache,
  @InjectModel(Wallet.name) private readonly walletModel: Model<Wallet>){}

  async register({ password, confirmPassword, email, ...data }: RegisterDto) {
    try {
      const user = await this.userModel.findOne({ email });
      if(user) throw new ConflictException('Email already exists!');

      if(password !== confirmPassword) throw new ConflictException('Not Same Password');
      const code = codeGenerator();

      await this.cacheManager.set(email, {code, limits: 3}, 120000);
      await this.mailerService.sendEmail(email, 'Registration', 'Do you agree to register?', `<b>Hey there!</b><br> Your verification code: ${code}.<br/>`);
      
      const hashedPass = await hash(password, +salt);
      const newUser = new this.userModel({
        ...data, password: hashedPass, email
      });
      
      await this.cacheManager.set('newUser', newUser, 3600000);
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

      const newUser: any = await this.cacheManager.get('newUser');
      await newUser.save();

      await this.walletModel.create({ userId: newUser.id, walletNumber: cc_number() });

      const token = this.jwtService.sign({ id: newUser.id });
      return { message: 'Success', token }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async login({ email, password }: LoginDto) {
    try {
      const user = await this.userModel.findOne({ email });
      if(!user) throw new ForbiddenException('Invalid email or password!');

      const checkPass = await compare(password, user.password);
      if(!checkPass) throw new ForbiddenException('Invalid email or password!');

      const token = this.jwtService.sign({ id: user.id });
      return { message: 'Success', token }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  logout() {
    return { message: 'Success', token: '' }
  }
}
