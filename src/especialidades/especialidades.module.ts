import { Module } from '@nestjs/common';
import { EspecialidadesService } from './especialidades.service';
import { EspecialidadesController } from './especialidades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Especialidade } from './entities/especialidade.entity';
import { CentrosSaluds } from 'src/centrossaluds/entities/centrossalud.entity';
import { CentroSaludHasEspecialidade } from 'src/centrosaludhasespecialidades/entities/centrosaludhasespecialidade.entity';

@Module({
  controllers: [EspecialidadesController],
  providers: [EspecialidadesService],
  imports: [TypeOrmModule.forFeature([Especialidade, CentrosSaluds, CentroSaludHasEspecialidade ])],
  exports: [EspecialidadesService]
})
export class EspecialidadesModule {}
