import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from 'src/libs/models/company.model';
import { LibsModule } from 'src/libs/libs.module';
import { JwtModule } from '@nestjs/jwt';
import { CacheModule } from '@nestjs/cache-manager';

const jwt_key = process.env.JWT_KEY;

@Module({
  imports: [
      LibsModule,
      JwtModule.register({
      global: true,
      secret: jwt_key,
      signOptions: { expiresIn: '24h' },
    }),
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
    CacheModule.register()
  ],
  controllers: [CompanyController],
  providers: [CompanyService],
})
export class CompanyModule {}
