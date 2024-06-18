import { Module } from '@nestjs/common';
import { CentrossaludsService } from './centrossaluds.service';
import { CentrossaludsController } from './centrossaluds.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CentrosSaluds } from './entities/centrossaludentity';
import { CentrosSaludFoto } from './entities/centrossalud-foto.entity';
import { CentrosSaludsEspecialidades } from './entities/centrossalud-has-especialidad.entity';

@Module({
  controllers: [CentrossaludsController],
  providers: [CentrossaludsService],
  imports: [TypeOrmModule.forFeature([CentrosSaluds, CentrosSaludFoto, CentrosSaludsEspecialidades]),
  AuthModule
  ],

  exports: [CentrossaludsService]
})
export class CentrossaludsModule {}
