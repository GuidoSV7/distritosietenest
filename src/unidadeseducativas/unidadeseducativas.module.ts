
import { Module } from '@nestjs/common';
import { UnidadeseducativasService } from './unidadeseducativas.service';
import { UnidadeseducativasController } from './unidadeseducativas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unidadeseducativa, UnidadEducativaFoto } from './entities';
import { AuthModule } from 'src/auth/auth.module';
import { GestionesModule } from 'src/gestiones/gestiones.module';
import { InfraestructurasModule } from 'src/infraestructuras/infraestructuras.module';
import { TipocolegiosModule } from 'src/tipocolegios/tipocolegios.module';
import { TurnosModule } from 'src/turnos/turnos.module';
import { Gestione } from 'src/gestiones/entities/gestione.entity';


@Module({
  controllers: [UnidadeseducativasController],
  providers: [UnidadeseducativasService],
  imports: [
    TypeOrmModule.forFeature([Unidadeseducativa, UnidadEducativaFoto, Gestione]),
    GestionesModule, // Importa GestionesModule correctamente aquí
    AuthModule,
    TipocolegiosModule,
    TurnosModule,
    InfraestructurasModule,
   

  ],
  
  exports: [UnidadeseducativasService,TypeOrmModule]


,
})
export class UnidadeseducativasModule {}
