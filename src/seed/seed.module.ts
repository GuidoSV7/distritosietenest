import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { UnidadeseducativasModule } from 'src/unidadeseducativas/unidadeseducativas.module';
import { InfraestructurasModule } from 'src/infraestructuras/infraestructuras.module';
import { TipocolegiosModule } from 'src/tipocolegios/tipocolegios.module';
import { TurnosModule } from 'src/turnos/turnos.module';
import { GestionesModule } from 'src/gestiones/gestiones.module';
import { ApoyossocialesModule } from 'src/apoyossociales/apoyossociales.module';
import { ApoyosgubernamentalesModule } from 'src/apoyosgubernamentales/apoyosgubernamentales.module';
import { DesayunosModule } from 'src/desayunos/desayunos.module';
import { MantenimientosModule } from 'src/mantenimientos/mantenimientos.module';
import { AuthModule } from 'src/auth/auth.module';
import { CategoriasModule } from 'src/categorias/categorias.module';
import { EspecialidadesModule } from 'src/especialidades/especialidades.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [
    UnidadeseducativasModule, 
    InfraestructurasModule, 
    TipocolegiosModule, 
    TurnosModule, 
    GestionesModule, 
    ApoyossocialesModule,
    ApoyosgubernamentalesModule,
    DesayunosModule,
    MantenimientosModule,
    CategoriasModule,
    EspecialidadesModule,



    AuthModule
  
  ],
})
export class SeedModule {}
