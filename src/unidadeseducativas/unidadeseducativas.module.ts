
import { Module } from '@nestjs/common';
import { UnidadeseducativasService } from './unidadeseducativas.service';
import { UnidadeseducativasController } from './unidadeseducativas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unidadeseducativa, UnidadEducativaFoto } from './entities';
import { AuthModule } from 'src/auth/auth.module';


@Module({
  controllers: [UnidadeseducativasController],
  providers: [UnidadeseducativasService],
  imports: [TypeOrmModule.forFeature([Unidadeseducativa, UnidadEducativaFoto]),
  AuthModule
  ],
  
  exports: [UnidadeseducativasService,TypeOrmModule]


,
})
export class UnidadeseducativasModule {}
