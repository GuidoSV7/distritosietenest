import { Module } from '@nestjs/common';
import { ApoyosgubernamentalesService } from './apoyosgubernamentales.service';
import { ApoyosgubernamentalesController } from './apoyosgubernamentales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apoyosgubernamentale } from './entities/apoyosgubernamentale.entity';
import { Unidadeseducativa } from 'src/unidadeseducativas/entities';

@Module({
  controllers: [ApoyosgubernamentalesController],
  providers: [ApoyosgubernamentalesService],
  imports: [TypeOrmModule.forFeature([Apoyosgubernamentale, Unidadeseducativa ])],
  exports: [ApoyosgubernamentalesService]
})
export class ApoyosgubernamentalesModule {}
