import { Module } from '@nestjs/common';
import { CentrosaludhasespecialidadesService } from './centrosaludhasespecialidades.service';
import { CentrosaludhasespecialidadesController } from './centrosaludhasespecialidades.controller';
import { CentroSaludHasEspecialidade } from './entities/centrosaludhasespecialidade.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Especialidade } from 'src/especialidades/entities/especialidade.entity';
import { CentrosSaluds } from 'src/centrossaluds/entities/centrossalud.entity';
import { EspecialidadesModule } from 'src/especialidades/especialidades.module';
import { CentrossaludsModule } from 'src/centrossaluds/centrossaluds.module';

@Module({
  controllers: [CentrosaludhasespecialidadesController],
  providers: [CentrosaludhasespecialidadesService],
  imports:[TypeOrmModule.forFeature([CentroSaludHasEspecialidade, Especialidade, CentrosSaluds]),

  EspecialidadesModule,
  CentrossaludsModule
  ],
})
export class CentrosaludhasespecialidadesModule {}
