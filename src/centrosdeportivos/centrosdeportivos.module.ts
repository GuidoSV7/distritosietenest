import { Module } from '@nestjs/common';
import { CentrosdeportivosService } from './centrosdeportivos.service';
import { CentrosdeportivosController } from './centrosdeportivos.controller';
import { CentrosDeportivoFoto } from './entities/centrosdeportivo-foto.entity';
import { CentrosDeportivos } from './entities/centrosdeportivo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [CentrosdeportivosController],
  providers: [CentrosdeportivosService],
  imports: [TypeOrmModule.forFeature([CentrosDeportivos, CentrosDeportivoFoto])
  ],
})
export class CentrosdeportivosModule {}
