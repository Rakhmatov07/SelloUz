import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/libs/models/user.model';
import { Company, CompanySchema } from 'src/libs/models/company.model';
import { Brand, BrandSchema } from 'src/libs/models/brand.model';
import { Category, CategorySchema } from 'src/libs/models/category.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }, { name: Company.name, schema: CompanySchema }, 
    { name: Brand.name, schema: BrandSchema }, { name: Category.name, schema: CategorySchema }])],
  controllers: [AdminController],
  providers: [AdminService],
})
export class AdminModule {}
