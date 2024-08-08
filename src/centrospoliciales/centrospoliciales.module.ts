import { Module } from '@nestjs/common';
import { CentrospolicialesService } from './centrospoliciales.service';
import { CentrospolicialesController } from './centrospoliciales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Centrospoliciale } from './entities/centrospoliciale.entity';

@Module({
  controllers: [CentrospolicialesController],
  providers: [CentrospolicialesService],
  imports: [TypeOrmModule.forFeature([Centrospoliciale]) ]
})
export class CentrospolicialesModule {}
