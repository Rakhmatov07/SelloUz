import { Controller, Get, Post, Body, Patch, Delete, UseGuards, Req } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CreateCompanyDto, LoginCompanyDto, UpdateCompanyDto } from './dto';
import { VerifyDto } from '../auth/dto';
import { AuthGuard } from 'src/libs/guards/auth.guard';
import { IRequest } from 'src/libs/types/request';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Company')
@Controller('company')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post('register')
  register(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.register(createCompanyDto);
  }

  @Post('verify')
  verifyEmail(@Body() verifyDto: VerifyDto) {
    return this.companyService.verifyEmail(verifyDto);
  }

  @Post('login')
  login(@Body() loginCompanyDto: LoginCompanyDto) {
    return this.companyService.login(loginCompanyDto);
  }

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: "This route to get Company profile" })
  @UseGuards(AuthGuard)
  findOwnProfile(@Req() req: IRequest) {
    return this.companyService.findOwnProfile(req);
  }

  @Patch('update')
  @ApiBearerAuth()
  @ApiOperation({ summary: "This route to update Company profile" })
  @UseGuards(AuthGuard)
  updateProfile(@Body() updateCompanyDto: UpdateCompanyDto, @Req() req: IRequest) {
    return this.companyService.updateProfile(updateCompanyDto, req);
  }

  @Delete('logout')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  logout() {
    return this.companyService.logout();
  }
}
