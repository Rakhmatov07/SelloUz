import { Controller, Get, Post, Body, Patch, Delete, UseGuards, Req, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/libs/guards/auth.guard';
import { IRequest } from 'src/libs/types/request';
import mongoose from 'mongoose';
import { UpdateUserDto } from './dto/updateUser.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
@Controller('user')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('favourite/:productId')
  @ApiOperation({ summary: "This route to add product to favourites" })
  addProductToFavourites(@Req() req: IRequest, @Param('productId') productId: string){
    return this.userService.addProductToFavourites(req, productId);
  }

  @Get('favourite')
  @ApiOperation({ summary: "This route to get favourite products" })
  findFavourites(@Req() req: IRequest){
    return this.userService.findFavourites(req);
  }

  @Get()
  @ApiOperation({ summary: "This route to get own profile" })
  findOwnProfile(@Req() req: IRequest) {
    return this.userService.findOwnProfile(req);
  }

  @Patch()
  @ApiOperation({ summary: "This route to update profile" })
  updateProfile(@Body() updateUserDto: UpdateUserDto, @Req() req: IRequest) {
    return this.userService.updateProfile(updateUserDto, req);
  }

  @Delete('favourite/:productId')
  @ApiOperation({ summary: "This route to remove product from favourites" })
  removeProductFromFavourites(@Req() req: IRequest, @Param('productId') productId: mongoose.Types.ObjectId){
    return this.userService.removeProductFromFavourites(req, productId);
  }
}
