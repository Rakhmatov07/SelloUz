import { Controller, Get, UseGuards, Req, Body, Post, Patch } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { AuthGuard } from 'src/libs/guards/auth.guard';
import { IRequest } from 'src/libs/types/request';
import { PaymentDto } from './dto/payment.dto';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Wallet')
@Controller('wallet')
@ApiBearerAuth()
@UseGuards(AuthGuard)
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get()
  @ApiOperation({ summary: "This route to get own wallet" })
  findWallet(@Req() req: IRequest) {
    return this.walletService.findWallet(req);
  }

  @Patch('activate')
  @ApiOperation({ summary: "This route to activate wallet" })
  activateWallet(@Req() req: IRequest){
    return this.walletService.activateWallet(req);
  }

  @Patch('inactivate')
  @ApiOperation({ summary: "This route to inactivate wallet" })
  inActivateWallet(@Req() req: IRequest){
    return this.walletService.inActivateWallet(req);
  }

  @Post()
  @ApiOperation({ summary: "This route to fill wallet balance" })
  fillBalance(@Req() req: IRequest, @Body() paymentDto: PaymentDto) {
    return this.walletService.fillBalance(req, paymentDto);
  }
}
