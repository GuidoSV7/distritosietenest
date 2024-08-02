import { Module } from '@nestjs/common';
import { DenunciasService } from './denuncias.service';
import { DenunciasController } from './denuncias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Denuncia } from './entities/denuncia.entity';
import { Unidadeseducativa } from 'src/unidadeseducativas/entities';
import { TelegramModule } from 'src/telegram/telegram.module';
import { UnidadeseducativasModule } from 'src/unidadeseducativas/unidadeseducativas.module';

@Module({
  controllers: [DenunciasController],
  providers: [DenunciasService],
  imports: [
    TypeOrmModule.forFeature([Denuncia, Unidadeseducativa]),
    TelegramModule, UnidadeseducativasModule
  ],
  
})
export class DenunciasModule {}
