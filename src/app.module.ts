import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnidadeseducativasModule } from './unidadeseducativas/unidadeseducativas.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { FilesModule } from './files/files.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { AuthModule } from './auth/auth.module';
import { InfraestructurasModule } from './infraestructuras/infraestructuras.module';
import { TipocolegiosModule } from './tipocolegios/tipocolegios.module';
import { TurnosModule } from './turnos/turnos.module';
import { GestionesModule } from './gestiones/gestiones.module';
import { ApoyossocialesModule } from './apoyossociales/apoyossociales.module';
import { ApoyosgubernamentalesModule } from './apoyosgubernamentales/apoyosgubernamentales.module';
import { DesayunosModule } from './desayunos/desayunos.module';
import { MantenimientosModule } from './mantenimientos/mantenimientos.module';
import { CategoriasModule } from './categorias/categorias.module';
import { CentrossaludsModule } from './centrossaluds/centrossaluds.module';
import { EspecialidadesModule } from './especialidades/especialidades.module';
import { TelegramModule } from './telegram/telegram.module';
import { CentrosdeportivosModule } from './centrosdeportivos/centrosdeportivos.module';
import { CentrosturisticosModule } from './centrosturisticos/centrosturisticos.module';
import { DenunciasModule } from './denuncias/denuncias.module';

import { NumerosemergenciasModule } from './numerosemergencias/numerosemergencias.module';
import { CentrosaludhasespecialidadesModule } from './centrosaludhasespecialidades/centrosaludhasespecialidades.module';
import { OficinadistritalModule } from './oficinadistrital/oficinadistrital.module';


@Module({
  imports: [


    CloudinaryModule,
    
    ConfigModule.forRoot({isGlobal:true}),

    TypeOrmModule.forRoot({
      ssl: process.env.STAGE === 'prod',
      extra: {
        ssl: process.env.STAGE === 'prod'
              ? { rejectUnauthorized: false }
              : null,
      },

      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
    }),
    

    UnidadeseducativasModule,

    CommonModule,

    SeedModule,

    FilesModule,

    AuthModule,

    InfraestructurasModule,

    TipocolegiosModule,

    TurnosModule,

    GestionesModule,

    ApoyossocialesModule,

    ApoyosgubernamentalesModule,

    DesayunosModule,

    MantenimientosModule,

    CategoriasModule,

    CentrossaludsModule,

    EspecialidadesModule,

    TelegramModule,

    CentrosdeportivosModule,

    CentrosturisticosModule,

    DenunciasModule,


    NumerosemergenciasModule,

    CentrosaludhasespecialidadesModule,

    OficinadistritalModule


  ],
  controllers: [],
  providers: [CloudinaryService],
})
export class AppModule {}
