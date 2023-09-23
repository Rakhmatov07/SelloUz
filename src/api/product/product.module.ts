import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/libs/models/product.model';
import { Company, CompanySchema } from 'src/libs/models/company.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }, { name: Company.name, schema: CompanySchema }])],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
