import { Module } from '@nestjs/common';
import { ApoyosgubernamentalesService } from './apoyosgubernamentales.service';
import { ApoyosgubernamentalesController } from './apoyosgubernamentales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Apoyosgubernamentale } from './entities/apoyosgubernamentale.entity';
import { Unidadeseducativa } from 'src/unidadeseducativas/entities';
import { CategoriasService } from 'src/categorias/categorias.service';
import { CategoriasModule } from 'src/categorias/categorias.module';

@Module({
  controllers: [ApoyosgubernamentalesController],
  providers: [ApoyosgubernamentalesService],
  imports: [TypeOrmModule.forFeature([Apoyosgubernamentale, Unidadeseducativa ]),  
    CategoriasModule
  ],
  exports: [ApoyosgubernamentalesService]
})
export class ApoyosgubernamentalesModule {}
