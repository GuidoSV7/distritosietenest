import { Module } from '@nestjs/common';
import { CentrossaludsService } from './centrossaluds.service';
import { CentrossaludsController } from './centrossaluds.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CentrosSaluds } from './entities/centrossalud.entity';
import { CentrosSaludFoto } from './entities/centrossalud-foto.entity';
import { CentrosSaludsEspecialidades } from './entities/centrossalud-has-especialidad.entity';
import { Especialidade } from 'src/especialidades/entities/especialidade.entity';

@Module({
  controllers: [CentrossaludsController],
  providers: [CentrossaludsService],
  imports: [TypeOrmModule.forFeature([CentrosSaluds, CentrosSaludFoto, CentrosSaludsEspecialidades, Especialidade]),
  AuthModule
  ],

  exports: [CentrossaludsService]
})
export class CentrossaludsModule {}
