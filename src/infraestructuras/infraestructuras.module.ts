import { Module } from '@nestjs/common';
import { InfraestructurasService } from './infraestructuras.service';
import { InfraestructurasController } from './infraestructuras.controller';
import { Infraestructura } from './entities/infraestructura.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unidadeseducativa } from 'src/unidadeseducativas/entities';

@Module({
  controllers: [InfraestructurasController],
  providers: [InfraestructurasService],
  imports: [TypeOrmModule.forFeature([Infraestructura, Unidadeseducativa ])],
  exports: [InfraestructurasService]
  
})
export class InfraestructurasModule {}
