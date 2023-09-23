import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Brand } from 'src/libs/models/brand.model';
import { Company } from 'src/libs/models/company.model';
import { User } from 'src/libs/models/user.model';
import { CreateBrandDto, CreateCategoryDto, UpdateBrandDto, UpdateCategoryDto } from './dto';
import { Category } from 'src/libs/models/category.model';

@Injectable()
export class AdminService {
  constructor( @InjectModel(User.name) private readonly userModel: Model<User>, 
    @InjectModel(Company.name) private readonly companyModel: Model<Company>, 
    @InjectModel(Brand.name) private readonly brandModel: Model<Brand>,
    @InjectModel(Category.name) private readonly categoryModel: Model<Category> ){}

  async createBrand(createBrandDto: CreateBrandDto) {
    try {
      const brand = await this.brandModel.findOne({ name: createBrandDto.name });
      if(brand) throw new ConflictException(`${createBrandDto.name} already exists`);

      const newBrand = await this.brandModel.create(createBrandDto);
      return { message: 'Success', newBrand }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findAllBrands() {
    try {
      const brands = await this.brandModel.find();
      if(!brands) throw new NotFoundException('Not Found');

      return { message: 'Success', brands }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async updateBrand(updateBrandDto: UpdateBrandDto, brandId: string) {
    try {
      const updBrand = await this.brandModel.findByIdAndUpdate(brandId, { $set: updateBrandDto }, { new: true });

      return { message: 'Success', updBrand }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async removeBrand(brandId: string) {
    try {
      const dtBrand = await this.brandModel.findByIdAndDelete(brandId);

      return { message: 'Success', dtBrand }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async createCategory(createCategoryDto: CreateCategoryDto) {
    try {
      const category = await this.categoryModel.findOne({ name: createCategoryDto.name });
      if(category) throw new ConflictException(`${createCategoryDto.name} already exists`);

      const newCategory = await this.categoryModel.create(createCategoryDto);
      return { message: 'Success', newCategory }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findAllCategories() {
    try {
      const categories = await this.categoryModel.find();
      if(!categories) throw new NotFoundException('Not Found');

      return { message: 'Success', categories }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async updateCategory(updateCategoryDto: UpdateCategoryDto, categoryId: string) {
    try {
      const updCategory = await this.categoryModel.findByIdAndUpdate(categoryId, { $set: updateCategoryDto }, { new: true });
      
      return { message: 'Success', updCategory }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async removeCategory(categoryId: string) {
    try {
      const dtCategory = await this.categoryModel.findByIdAndDelete(categoryId);

      return { message: 'Success', dtCategory }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findAllCompanies() {
    try {
      const companies = await this.companyModel.find();
      if(!companies) throw new NotFoundException('Not Found');

      return { message: 'Success', companies };
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findOneCompany(companyId: string) {
    try {
      const company = await this.companyModel.findById(companyId);
      if(!company) throw new NotFoundException('Not Found');

      return { message: 'Success', company };
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async findAllUsers() {
    try {
      const users = await this.userModel.find();
      if(!users) throw new NotFoundException('Not Found');

      return { message: 'Success', users };
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findOneUser(userId: string) {
    try {
      const user = await this.userModel.findById(userId);
      if(!user) throw new NotFoundException('Not Found');

      return { message: 'Success', user };
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async checkCompany(companyId: string) {
    try {
      const checkedCompany = await this.companyModel.findByIdAndUpdate(companyId, { $set: { isChecked: true } }, { new: true });
      return { message: 'Success', checkedCompany };
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async unCheckCompany(companyId: string) {
    try {
      const uncheckedCompany = await this.companyModel.findByIdAndUpdate(companyId, { $set: { isChecked: false } }, { new: true });
      return { message: 'Success', uncheckedCompany };
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
