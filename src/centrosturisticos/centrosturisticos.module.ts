import { Module } from '@nestjs/common';
import { CentrosturisticosService } from './centrosturisticos.service';
import { CentrosturisticosController } from './centrosturisticos.controller';
import { CentrosTuristico } from './entities/centrosturistico.entity';
import { CentrosTuristicoFoto } from './entities/centroturistico-foto.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [CentrosturisticosController],
  providers: [CentrosturisticosService],
  imports: [TypeOrmModule.forFeature([CentrosTuristico, CentrosTuristicoFoto])
],
})
export class CentrosturisticosModule {}
