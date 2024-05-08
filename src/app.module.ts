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


@Module({
  imports: [


    CloudinaryModule,
    
    ConfigModule.forRoot({isGlobal:true}),

    TypeOrmModule.forRoot({
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

    AuthModule


  ],
  controllers: [],
  providers: [CloudinaryService],
})
export class AppModule {}
