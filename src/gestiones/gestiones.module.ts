import { Module } from '@nestjs/common';
import { GestionesService } from './gestiones.service';
import { GestionesController } from './gestiones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unidadeseducativa } from 'src/unidadeseducativas/entities';
import { Gestione } from './entities/gestione.entity';

@Module({
  controllers: [GestionesController],
  providers: [GestionesService],
  imports: [TypeOrmModule.forFeature([Gestione, Unidadeseducativa ])],
  exports: [GestionesService]
})
export class GestionesModule {}
