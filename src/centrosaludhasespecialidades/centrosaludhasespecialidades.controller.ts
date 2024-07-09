import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { CentrosaludhasespecialidadesService } from './centrosaludhasespecialidades.service';
import { CreateCentrosaludhasespecialidadeDto } from './dto/create-centrosaludhasespecialidade.dto';
import { UpdateCentrosaludhasespecialidadeDto } from './dto/update-centrosaludhasespecialidade.dto';
import { ApiResponse } from '@nestjs/swagger';
import { CentroSaludHasEspecialidade } from './entities/centrosaludhasespecialidade.entity';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Controller('centrosaludhasespecialidades')
export class CentrosaludhasespecialidadesController {
  constructor(private readonly turnosService: CentrosaludhasespecialidadesService) {}

  @Post()
  @ApiResponse({status:201, description:'CentroSaludHasEspecialidade Creado exitosamente', type: CentroSaludHasEspecialidade})
  @ApiResponse({status:400, description:'Bad Request'})
  create(@Body() createCentroSaludHasEspecialidadeDto: CreateCentrosaludhasespecialidadeDto) {
    return this.turnosService.create(createCentroSaludHasEspecialidadeDto);
  }

  @Get()
  findAll( @Query() paginationDto:PaginationDto)  {
    return this.turnosService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.turnosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, 
        @Body() updateCentroSaludHasEspecialidadeDto: UpdateCentrosaludhasespecialidadeDto) 
        {
    return this.turnosService.update(id, updateCentroSaludHasEspecialidadeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.turnosService.remove(id);
  }
}
