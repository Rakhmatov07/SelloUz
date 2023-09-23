import { Controller, Get, Patch, Param, UseGuards, Post, Delete, Body } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminGuard } from 'src/libs/guards/admin.guard';
import { CreateBrandDto, CreateCategoryDto, UpdateBrandDto, UpdateCategoryDto } from './dto';
import { AuthGuard } from 'src/libs/guards/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('brand')
  @ApiBearerAuth()
  @ApiOperation({ summary: "This route to create Brand" })
  @UseGuards(AuthGuard, AdminGuard)
  createBrand(@Body() createBrandDto: CreateBrandDto ) {
    return this.adminService.createBrand(createBrandDto);
  }

  @Get('brand')
  @ApiOperation({ summary: "This route to get all Brands" })
  findAllBrands() {
    return this.adminService.findAllBrands();
  }

  @Patch('brand/:brandId')
  @ApiBearerAuth()
  @ApiOperation({ summary: "This route to update Brand by Id" })
  @UseGuards(AuthGuard, AdminGuard)
  updateBrand(@Body() updateBrandDto: UpdateBrandDto, @Param('brandId') brandId: string) {
    return this.adminService.updateBrand(updateBrandDto, brandId);
  }

  @Delete('brand/:brandId')
  @ApiBearerAuth()
  @ApiOperation({ summary: "This route to remove Brand by Id" })
  @UseGuards(AuthGuard, AdminGuard)
  removeBrand(@Param('brandId') brandId: string ) {
    return this.adminService.removeBrand(brandId);
  }

  @Post('category')
  @ApiBearerAuth()
  @ApiOperation({ summary: "This route to create Category" })
  @UseGuards(AuthGuard, AdminGuard)
  createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.adminService.createCategory(createCategoryDto);
  }

  @Get('category')
  @ApiOperation({ summary: "This route to get all Categories" })
  findAllCategories() {
    return this.adminService.findAllCategories();
  }

  @Patch('category/:categoryId')
  @ApiBearerAuth()
  @ApiOperation({ summary: "This route to update Category by Id" })
  @UseGuards(AuthGuard, AdminGuard)
  updateCategory(@Body() updateCategoryDto: UpdateCategoryDto, @Param('categoryId') categoryId: string) {
    return this.adminService.updateCategory(updateCategoryDto, categoryId);
  }

  @Delete('category/:categoryId')
  @ApiBearerAuth()
  @ApiOperation({ summary: "This route to remove Category" })
  @UseGuards(AuthGuard, AdminGuard)
  removeCategory(@Param('categoryId') categoryId: string ) {
    return this.adminService.removeCategory(categoryId);
  }

  @Get('company')
  @ApiOperation({ summary: "This route to get all Companies" })
  findAllCompanies() {
    return this.adminService.findAllCompanies();
  }

  @Get('user')
  @ApiBearerAuth()
  @ApiOperation({ summary: "This route to get all Users" })
  @UseGuards(AuthGuard, AdminGuard)
  findAllUsers() {
    return this.adminService.findAllUsers();
  }

  @Get('company/:companyId')
  @ApiBearerAuth()
  @ApiOperation({ summary: "This route to get Company by Id" })
  @UseGuards(AuthGuard, AdminGuard)
  findOneCompany(@Param('companyId') companyId: string) {
    return this.adminService.findOneCompany(companyId);
  }

  @Get('user/:userId')
  @ApiBearerAuth()
  @ApiOperation({ summary: "This route to get User by Id" })
  @UseGuards(AuthGuard, AdminGuard)
  findOneUser(@Param('userId') userId: string) {
    return this.adminService.findOneUser(userId);
  }

  @Patch('company/check/:companyId')
  @ApiBearerAuth()
  @ApiOperation({ summary: "This route to change company to active" })
  @UseGuards(AuthGuard, AdminGuard)
  checkCompany(@Param('companyId') companyId: string) {
    return this.adminService.checkCompany(companyId);
  }

  @Patch('company/uncheck/:companyId')
  @ApiBearerAuth()
  @ApiOperation({ summary: "This route to change company to inactive" })
  @UseGuards(AuthGuard, AdminGuard)
  unCheckCompany(@Param('companyId') companyId: string) {
    return this.adminService.unCheckCompany(companyId);
  }
}
