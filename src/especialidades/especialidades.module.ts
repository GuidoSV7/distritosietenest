import { Module } from '@nestjs/common';
import { EspecialidadesService } from './especialidades.service';
import { EspecialidadesController } from './especialidades.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Especialidade } from './entities/especialidade.entity';
import { CentrosSaluds } from 'src/centrossaluds/entities/centrossalud.entity';

@Module({
  controllers: [EspecialidadesController],
  providers: [EspecialidadesService],
  imports: [TypeOrmModule.forFeature([Especialidade, CentrosSaluds ])],
  exports: [EspecialidadesService]
})
export class EspecialidadesModule {}
