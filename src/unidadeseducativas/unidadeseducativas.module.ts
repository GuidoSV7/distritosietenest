
import { Module } from '@nestjs/common';
import { UnidadeseducativasService } from './unidadeseducativas.service';
import { UnidadeseducativasController } from './unidadeseducativas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Unidadeseducativa, UnidadEducativaFoto } from './entities';


@Module({
  controllers: [UnidadeseducativasController],
  providers: [UnidadeseducativasService],
  imports: [TypeOrmModule.forFeature([Unidadeseducativa, UnidadEducativaFoto])],
  
  exports: [UnidadeseducativasService,TypeOrmModule]


,
})
export class UnidadeseducativasModule {}
