import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CentrosdeportivosService } from './centrosdeportivos.service';
import { CreateCentrosdeportivoDto } from './dto/create-centrosdeportivo.dto';
import { UpdateCentrosdeportivoDto } from './dto/update-centrosdeportivo.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ApiResponse } from '@nestjs/swagger';
import { CentrosDeportivos } from './entities/centrosdeportivo.entity';

@Controller('centrosdeportivos')
export class CentrosdeportivosController {
  constructor(private readonly centrosdeportivosService: CentrosdeportivosService) {}

  @Post()
  @ApiResponse({status:201, description:'Centrosdeportivo Creado exitosamente', type: CentrosDeportivos})
  @ApiResponse({status:400, description:'Bad Request'})
  create(@Body() createCentrosdeportivoDto: CreateCentrosdeportivoDto) {
    return this.centrosdeportivosService.create(createCentrosdeportivoDto);
  }

  @Get()
  findAll( @Query() paginationDto:PaginationDto)  {
    return this.centrosdeportivosService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.centrosdeportivosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, 
        @Body() updateCentrosdeportivoDto: UpdateCentrosdeportivoDto) 
        {
    return this.centrosdeportivosService.update(id, updateCentrosdeportivoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.centrosdeportivosService.remove(id);
  }
}
