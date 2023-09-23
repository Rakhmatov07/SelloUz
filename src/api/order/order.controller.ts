import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards, Req } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from 'src/libs/guards/auth.guard';
import { IRequest } from 'src/libs/types/request';
import { OrderProductDto } from './dto/order-product.dto';
import { BuyDto } from './dto/buy.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Order')
@Controller('order')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiOperation({ summary: "This route to create an order" })
  create(@Body() createOrderDto: CreateOrderDto, @Req() req: IRequest) {
    return this.orderService.create(createOrderDto, req);
  }

  @Post('product')
  @ApiOperation({ summary: "This route to add product to order" })
  addProductToOrder(@Body() orderProductDto: OrderProductDto, @Req() req: IRequest){
    return this.orderService.addProductToOrder(orderProductDto, req)
  }
  
  @Get()
  @ApiOperation({ summary: "This route to get own order" })
  findOrder(@Req() req: IRequest) {
    return this.orderService.findOrder(req);
  }

  @Put()
  @ApiOperation({ summary: "This route to make purchase" })
  buy(@Req() req: IRequest, @Body() buyDto: BuyDto) {
    return this.orderService.buy(req, buyDto);
  }

  @Patch('increase/:productId')
  @ApiOperation({ summary: "This route to increase product count in order" })
  increaseProductCount(@Param('productId') productId: string, @Req() req: IRequest) {
    return this.orderService.increaseProductCount(productId, req);
  }

  @Patch('decrease/:productId')
  @ApiOperation({ summary: "This route to decrease product count in order" })
  decreaseProductCount(@Param('productId') productId: string, @Req() req: IRequest) {
    return this.orderService.decreaseProductCount(productId, req);
  }

  @Delete(':productId')
  @ApiOperation({ summary: "This route to remove product from an order" })
  removeProductFromOrder(@Param('productId') productId: string, @Req() req: IRequest) {
    return this.orderService.removeProductFromOrder(productId, req);
  }
}
