import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { TelegramController } from './telegram.controller';
import { TelegramModule as TelegramModuleBot } from 'nestjs-telegram';

@Module({
  controllers: [TelegramController],
  providers: [TelegramService],
  exports: [TelegramService],
  imports: [TelegramModuleBot.forRoot({
    botKey: '7366956308:AAEhPa1lAA0RNSRmG8XhrDr5fgykAhkdZ0E'
  })],
})
export class TelegramModule {}
