import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { GestionesService } from './gestiones.service';
import { CreateGestioneDto } from './dto/create-gestione.dto';
import { UpdateGestioneDto } from './dto/update-gestione.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Gestione } from './entities/gestione.entity';

@ApiTags('Gestiones')

@Controller('gestiones')
export class GestionesController {
  constructor(private readonly gestionesService: GestionesService) {}

  @Post()
  @ApiResponse({status:201, description:'Gestion Creada exitosamente', type: Gestione})
  @ApiResponse({status:400, description:'Bad Request'})
  create(@Body() createGestioneDto: CreateGestioneDto) {
    return this.gestionesService.create(createGestioneDto);
  }

  @Get()
  findAll( @Query() paginationDto:PaginationDto)  {
    return this.gestionesService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.gestionesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, 
        @Body() updateGestioneDto: UpdateGestioneDto) 
        {
    return this.gestionesService.update(id, updateGestioneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.gestionesService.remove(id);
  }
}
