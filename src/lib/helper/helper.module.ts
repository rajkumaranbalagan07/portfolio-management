import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppLogger } from './logger';

@Module({
  imports: [ConfigModule.forRoot()],
  exports: [],
  providers: [AppLogger],
})
export class LoggerModule {}
