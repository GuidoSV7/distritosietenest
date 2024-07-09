import { Module } from '@nestjs/common';
import { CentrosaludhasespecialidadesService } from './centrosaludhasespecialidades.service';
import { CentrosaludhasespecialidadesController } from './centrosaludhasespecialidades.controller';
import { CentroSaludHasEspecialidade } from './entities/centrosaludhasespecialidade.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [CentrosaludhasespecialidadesController],
  providers: [CentrosaludhasespecialidadesService],
  imports:[TypeOrmModule.forFeature([CentroSaludHasEspecialidade])],
})
export class CentrosaludhasespecialidadesModule {}
