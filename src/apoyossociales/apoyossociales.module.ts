import { Module } from '@nestjs/common';
import { ApoyossocialesService } from './apoyossociales.service';
import { ApoyossocialesController } from './apoyossociales.controller';
import { Apoyossociale } from './entities/apoyossociale.entity';
import { Unidadeseducativa } from 'src/unidadeseducativas/entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ApoyossocialesController],
  providers: [ApoyossocialesService],
  imports: [TypeOrmModule.forFeature([Apoyossociale, Unidadeseducativa ])],
  exports: [ApoyossocialesService]
})
export class ApoyossocialesModule {}
