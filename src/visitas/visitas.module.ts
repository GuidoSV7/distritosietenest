import { Module } from '@nestjs/common';
import { VisitasService } from './visitas.service';
import { VisitasController } from './visitas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unidadeseducativa } from 'src/unidadeseducativas/entities';
import { Visita } from './entities/visita.entity';

@Module({
  controllers: [VisitasController],
  providers: [VisitasService],
  imports: [TypeOrmModule.forFeature([Visita, Unidadeseducativa ])],
  exports: [VisitasService]
})
export class VisitasModule {}
