import { Module } from '@nestjs/common';
import { BinanceSmartChainService } from './binance-smart-chain.service';
import { BinanceSmartChainController } from './binance-smart-chain.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [BinanceSmartChainController],
  providers: [BinanceSmartChainService],
})
export class BinanceSmartChainModule {}
