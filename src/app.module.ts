import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BinanceSmartChainModule } from './binance-smart-chain/binance-smart-chain.module';

@Module({
  imports: [
    BinanceSmartChainModule,
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validationOptions: {
        allowUnknown: true,
        abortEarly: true,
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
  // exports: [HttpModule, ConfigModule],
})
export class AppModule {}
