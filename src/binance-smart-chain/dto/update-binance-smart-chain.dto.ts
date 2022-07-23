import { PartialType } from '@nestjs/mapped-types';
import { CreateBinanceSmartChainDto } from './create-binance-smart-chain.dto';

export class UpdateBinanceSmartChainDto extends PartialType(CreateBinanceSmartChainDto) {}
