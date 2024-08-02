import { Module } from '@nestjs/common';
import { OficinadistritalService } from './oficinadistrital.service';
import { OficinadistritalController } from './oficinadistrital.controller';
import { Oficinadistrital } from './entities/oficinadistrital.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [OficinadistritalController],
  providers: [OficinadistritalService],
  imports: [TypeOrmModule.forFeature([Oficinadistrital ])]

})
export class OficinadistritalModule {}
