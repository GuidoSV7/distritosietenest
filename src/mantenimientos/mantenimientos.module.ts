import { Module } from '@nestjs/common';
import { MantenimientosService } from './mantenimientos.service';
import { MantenimientosController } from './mantenimientos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DesayunosService } from 'src/desayunos/desayunos.service';
import { Desayuno } from 'src/desayunos/entities/desayuno.entity';
import { Unidadeseducativa } from 'src/unidadeseducativas/entities';
import { Mantenimiento } from './entities/mantenimiento.entity';

@Module({
  controllers: [MantenimientosController],
  providers: [MantenimientosService],
  imports: [TypeOrmModule.forFeature([Mantenimiento, Unidadeseducativa ])],
  exports: [MantenimientosService]
})
export class MantenimientosModule {}
