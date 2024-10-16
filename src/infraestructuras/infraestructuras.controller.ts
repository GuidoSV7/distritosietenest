import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { InfraestructurasService } from './infraestructuras.service';
import { CreateInfraestructuraDto } from './dto/create-infraestructura.dto';
import { UpdateInfraestructuraDto } from './dto/update-infraestructura.dto';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Infraestructura } from './entities/infraestructura.entity';

@ApiTags('Infraestructuras')

@Controller('infraestructuras')
export class InfraestructurasController {
  constructor(private readonly infraestructurasService: InfraestructurasService) {}

  @Post()
  @ApiResponse({status:201, description:'Infraestructura Creada exitosamente', type: Infraestructura})
  @ApiResponse({status:400, description:'Bad Request'})
  create(@Body() createInfraestructuraDto: CreateInfraestructuraDto) {
    return this.infraestructurasService.create(createInfraestructuraDto);
  }

  @Get()
  findAll( @Query() paginationDto:PaginationDto)  {
    return this.infraestructurasService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.infraestructurasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, 
        @Body() updateInfraestructuraDto: UpdateInfraestructuraDto) 
        {
    return this.infraestructurasService.update(id, updateInfraestructuraDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.infraestructurasService.remove(id);
  }
}
