import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { UnidadeseducativasModule } from 'src/unidadeseducativas/unidadeseducativas.module';
import { InfraestructurasModule } from 'src/infraestructuras/infraestructuras.module';
import { TipocolegiosModule } from 'src/tipocolegios/tipocolegios.module';
import { TurnosModule } from 'src/turnos/turnos.module';
import { GestionesModule } from 'src/gestiones/gestiones.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [UnidadeseducativasModule, InfraestructurasModule, TipocolegiosModule, TurnosModule, GestionesModule],
})
export class SeedModule {}
