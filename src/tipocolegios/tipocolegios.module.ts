import { Module } from '@nestjs/common';
import { TipocolegiosService } from './tipocolegios.service';
import { TipocolegiosController } from './tipocolegios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tipocolegio } from './entities/tipocolegio.entity';
import { Unidadeseducativa } from 'src/unidadeseducativas/entities';

@Module({
  controllers: [TipocolegiosController],
  providers: [TipocolegiosService],
  imports: [TypeOrmModule.forFeature([Tipocolegio, Unidadeseducativa ])],
  exports: [TipocolegiosService]
})
export class TipocolegiosModule {}
