import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { MantenimientosService } from './mantenimientos.service';
import { CreateMantenimientoDto } from './dto/create-mantenimiento.dto';
import { UpdateMantenimientoDto } from './dto/update-mantenimiento.dto';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Mantenimiento } from './entities/mantenimiento.entity';

@ApiTags('Mantenimientos')

@Controller('mantenimientos')
export class MantenimientosController {
  constructor(private readonly mantenimientosService: MantenimientosService) {}

  @Post()
  @ApiResponse({status:201, description:'Mantenimiento Creado exitosamente', type: Mantenimiento})
  @ApiResponse({status:400, description:'Bad Request'})
  create(@Body() createMantenimientoDto: CreateMantenimientoDto) {
    return this.mantenimientosService.create(createMantenimientoDto);
  }

  @Get()
  findAll( @Query() paginationDto:PaginationDto)  {
    return this.mantenimientosService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.mantenimientosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, 
        @Body() updateMantenimientoDto: UpdateMantenimientoDto) 
        {
    return this.mantenimientosService.update(id, updateMantenimientoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.mantenimientosService.remove(id);
  }
}
