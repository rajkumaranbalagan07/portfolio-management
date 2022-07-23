import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { AppLogger } from 'src/lib/helper/logger';
import { BinanceSmartChainService } from './binance-smart-chain.service';
import { CreateBinanceSmartChainDto } from './dto/create-binance-smart-chain.dto';
import { UpdateBinanceSmartChainDto } from './dto/update-binance-smart-chain.dto';

@Controller('binance-smart-chain')
export class BinanceSmartChainController {
  constructor(
    private readonly binanceSmartChainService: BinanceSmartChainService,
  ) {}
  private readonly logger = new AppLogger();

  @Get('/balance/:address')
  async listTransactionstokens(@Param('address') address: string) {
    return await this.binanceSmartChainService.tokens(address);
  }

  @Get('listTransactions/:address')
  async listTransactions(
    @Param('address') address: string,
    @Query('page') page: number,
    @Query('offset') offset: number,
  ) {
    console.log('Controller Start listTransactions');
    let data = await this.binanceSmartChainService.listTransactions(
      address,
      page,
      offset,
    );
    console.log('Controller End');
    return data;
  }

  @Get('transaction/:transactionId')
  transaction(@Param('transactionId') transactionId: string) {
    return this.binanceSmartChainService.transaction(transactionId);
  }
}
