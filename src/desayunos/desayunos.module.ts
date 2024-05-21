import { Module } from '@nestjs/common';
import { DesayunosService } from './desayunos.service';
import { DesayunosController } from './desayunos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Desayuno } from './entities/desayuno.entity';
import { Unidadeseducativa } from 'src/unidadeseducativas/entities';

@Module({
  controllers: [DesayunosController],
  providers: [DesayunosService],
  imports: [TypeOrmModule.forFeature([Desayuno, Unidadeseducativa ])],
  exports: [DesayunosService]
})
export class DesayunosModule {}
