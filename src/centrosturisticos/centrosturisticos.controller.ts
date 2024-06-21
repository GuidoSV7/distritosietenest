import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CentrosturisticosService } from './centrosturisticos.service';
import { CreateCentrosturisticoDto } from './dto/create-centrosturistico.dto';
import { UpdateCentrosturisticoDto } from './dto/update-centrosturistico.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ApiResponse } from '@nestjs/swagger';
import { CentrosTuristico } from './entities/centrosturistico.entity';

@Controller('centrosturisticos')
export class CentrosturisticosController {
  constructor(private readonly centrosturisticosService: CentrosturisticosService) {}

  @Post()
  @ApiResponse({status:201, description:'Centrosturistico Creado exitosamente', type: CentrosTuristico})
  @ApiResponse({status:400, description:'Bad Request'})
  create(@Body() createCentrosturisticoDto: CreateCentrosturisticoDto) {
    return this.centrosturisticosService.create(createCentrosturisticoDto);
  }

  @Get()
  findAll( @Query() paginationDto:PaginationDto)  {
    return this.centrosturisticosService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.centrosturisticosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, 
        @Body() updateCentrosturisticoDto: UpdateCentrosturisticoDto) 
        {
    return this.centrosturisticosService.update(id, updateCentrosturisticoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.centrosturisticosService.remove(id);
  }
}
