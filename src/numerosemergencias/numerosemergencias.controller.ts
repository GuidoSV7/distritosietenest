import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { NumerosemergenciasService } from './numerosemergencias.service';
import { CreateNumerosemergenciaDto } from './dto/create-numerosemergencia.dto';
import { UpdateNumerosemergenciaDto } from './dto/update-numerosemergencia.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ApiResponse } from '@nestjs/swagger';
import { Numerosemergencia } from './entities/numerosemergencia.entity';

@Controller('numerosemergencias')
export class NumerosemergenciasController {
  constructor(private readonly numerosemergenciasService: NumerosemergenciasService) {}

  @Post()
  @ApiResponse({status:201, description:'Numerosemergencia Creada exitosamente', type: Numerosemergencia})
  @ApiResponse({status:400, description:'Bad Request'})
  create(@Body() createNumerosemergenciaDto: CreateNumerosemergenciaDto) {
    return this.numerosemergenciasService.create(createNumerosemergenciaDto);
  }

  @Get()
  findAll( @Query() paginationDto:PaginationDto)  {
    return this.numerosemergenciasService.findAll(paginationDto);
  }


 
}
