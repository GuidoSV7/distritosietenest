import { Module } from '@nestjs/common';
import { CentrossaludsService } from './centrossaluds.service';
import { CentrossaludsController } from './centrossaluds.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CentrosSaluds } from './entities/centrossalud.entity';
import { CentrosSaludFoto } from './entities/centrossalud-foto.entity';
import { Especialidade } from 'src/especialidades/entities/especialidade.entity';
import { CentroSaludHasEspecialidade } from 'src/centrosaludhasespecialidades/entities/centrosaludhasespecialidade.entity';

@Module({
  controllers: [CentrossaludsController],
  providers: [CentrossaludsService],
  imports: [TypeOrmModule.forFeature([CentrosSaluds, CentrosSaludFoto, CentroSaludHasEspecialidade, Especialidade]),
  AuthModule
  ],

  exports: [CentrossaludsService]
})
export class CentrossaludsModule {}
