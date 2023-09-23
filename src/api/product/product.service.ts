import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from './dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from 'src/libs/models/product.model';
import { Model } from 'mongoose';
import { IRequest } from 'src/libs/types/request';

@Injectable()
export class ProductService {
  constructor(@InjectModel(Product.name) private readonly productModel: Model<Product>){}

  async createProduct(createProductDto: CreateProductDto, req: IRequest) {
    try {
      const newProduct = await this.productModel.create({...createProductDto, companyId: req.id});
      
      return { message: 'Success', newProduct }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findAllProducts() {
    try {
      const products = await this.productModel.find();
      if(!products) throw new NotFoundException('Not Found');
      
      return { message: 'Success', products }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findOneProduct(productId: string) {
    try {
      const product = await this.productModel.findById(productId);
      if(!product) throw new NotFoundException('Not Found');

      return { message: 'Success', product }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findProductsByName(name: string){
    const regex = new RegExp(name, 'i');
    try {
      const products = await this.productModel.find({ name: regex }).exec();
      if(!products.length) throw new NotFoundException('Not Found');

      return { message: 'Success', products }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findProductsByCompany(companyId: string) {
    try {
      const products = await this.productModel.find({ companyId });
      if(!products) throw new NotFoundException('Not Found');

      return { message: 'Success', products }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findProductsByBrand(brandId: string) {
    try {
      const products = await this.productModel.find({ brandId });
      if(!products) throw new NotFoundException('Not Found');

      return { message: 'Success', products }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async findProductsByCategory(categoryId: string) {
    try {
      const products = await this.productModel.find({ categoryId });
      if(!products) throw new NotFoundException('Not Found');

      return { message: 'Success', products }
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async updateProduct(productId: string, { characteristics, ...data }: UpdateProductDto, req: IRequest) {
    try {
      let updateQuery = {
        _id: productId,
        companyId: req.id,
      };
  
      let updateFields: any = { $set: data };
  
      if (characteristics && characteristics.length > 0) {
        updateFields.$addToSet = {
          characteristics: { $each: characteristics },
        };
      }
  
      const updProduct = await this.productModel.findOneAndUpdate(
        updateQuery,
        updateFields,
        { new: true, lean: true }
      );
  
      if (!updProduct) {
        throw new NotFoundException(`Product with ID ${productId} not found for company ${req.id}`);
      }
  
      return { message: 'Success', updProduct };
    } catch (error) {
      throw new InternalServerErrorException('Failed to update product', error);
    }
  }
  
  

  async inactivateProduct(productId: string, req: IRequest){
    try {
      const inactiveProduct = await this.productModel.findOneAndUpdate({ _id: productId, companyId: req.id }, { $set: { isAvailable: false } }, { new: true });      
      if(!inactiveProduct) throw new NotFoundException('Not Found');

      return { message: 'Success', inactiveProduct };
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  async removeProduct(productId: string, req: IRequest) {
    try {
      const dtProduct = await this.productModel.findOneAndDelete({ _id: productId, companyId: req.id });
      if(!dtProduct) throw new NotFoundException('Not Found');

      return { message: 'Success', dtProduct };
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }
}
