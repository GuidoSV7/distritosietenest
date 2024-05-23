import { Module } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { Apoyosgubernamentale } from 'src/apoyosgubernamentales/entities/apoyosgubernamentale.entity';

@Module({
  controllers: [CategoriasController],
  providers: [CategoriasService],
  imports: [TypeOrmModule.forFeature([Categoria, Apoyosgubernamentale ])],
  exports: [CategoriasService]
})
export class CategoriasModule {}
