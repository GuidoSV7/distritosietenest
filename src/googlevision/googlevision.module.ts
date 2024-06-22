import { Module } from '@nestjs/common';
import { GooglevisionService } from './googlevision.service';
import { GooglevisionController } from './googlevision.controller';

@Module({
  controllers: [GooglevisionController],
  providers: [GooglevisionService],
  exports: [GooglevisionService]
})
export class GooglevisionModule {}
