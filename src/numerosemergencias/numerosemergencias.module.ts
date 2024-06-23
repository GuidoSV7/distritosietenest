import { Module } from '@nestjs/common';
import { NumerosemergenciasService } from './numerosemergencias.service';
import { NumerosemergenciasController } from './numerosemergencias.controller';
import { Numerosemergencia } from './entities/numerosemergencia.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [NumerosemergenciasController],
  providers: [NumerosemergenciasService],
  imports: [
    TypeOrmModule.forFeature([ Numerosemergencia])
  ]
  
})
export class NumerosemergenciasModule {}
