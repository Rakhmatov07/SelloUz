import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put, UseGuards, Req, ValidationPipe } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto';
import { AuthGuard } from 'src/libs/guards/auth.guard';
import { CheckedGuard } from 'src/libs/guards/checked.guard';
import { IRequest } from 'src/libs/types/request';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiBearerAuth()
  @ApiOperation({ summary: "This route to create a product" })
  @UseGuards(AuthGuard, CheckedGuard)
  createProduct(@Body(ValidationPipe) createProductDto: CreateProductDto, @Req() req: IRequest) {
    return this.productService.createProduct(createProductDto, req);
  }

  @Get()
  @ApiOperation({ summary: "This route to get all products" })
  findAllProducts() {
    return this.productService.findAllProducts();
  }

  @Get('search')
  @ApiOperation({ summary: "This route to search products by name" })
  findProductsByName(@Query('name') name: string) {
    return this.productService.findProductsByName(name);
  }
  
  @Get('brand/:brandId')
  @ApiOperation({ summary: "This route to search products by brand" })
  findProductsByBrand(@Param('brandId') brandId: string) {
    return this.productService.findProductsByBrand(brandId);
  }
  
  @Get('company/:companyId')
  @ApiOperation({ summary: "This route to search products by seller" })
  findProductsByCompany(@Param('companyId') companyId: string) {
    return this.productService.findProductsByCompany(companyId);
  }
  
  @Get('category/:categoryId')
  @ApiOperation({ summary: "This route to search products by category" })
  findProductsByCategory(@Param('categoryId') categoryId: string) {
    return this.productService.findProductsByCategory(categoryId);
  }

  @Get(':productId')
  @ApiOperation({ summary: "This route to get a product by Id" })
  findOneProduct(@Param('productId') productId: string) {
    return this.productService.findOneProduct(productId);
  }
  
  @Patch(':productId')
  @ApiBearerAuth()
  @ApiOperation({ summary: "This route to update product info" })
  @UseGuards(AuthGuard, CheckedGuard)
  updateProduct(@Param('productId') productId: string, @Body(ValidationPipe) updateProductDto: UpdateProductDto, @Req() req: IRequest) {
    return this.productService.updateProduct(productId, updateProductDto, req);
  }

  @Put(':productId')
  @ApiBearerAuth()
  @ApiOperation({ summary: "This route to inactivate a product" })
  @UseGuards(AuthGuard, CheckedGuard)
  inactivateProduct(@Param('productId') productId: string, @Req() req: IRequest){
    return this.productService.inactivateProduct(productId, req);
  }

  @Delete(':productId')
  @ApiBearerAuth()
  @ApiOperation({ summary: "This route to remove product" })
  @UseGuards(AuthGuard, CheckedGuard)
  removeProduct(@Param('productId') productId: string, @Req() req: IRequest) {
    return this.productService.removeProduct(productId, req);
  }
}
